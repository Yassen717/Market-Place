"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthUser } from "@/firebase/auth";
import { getDb } from "@/firebase/db";
import { getStorageBucket } from "@/firebase/storage";
import { cn } from "@/lib/helpers";
import { APP_CATEGORIES } from "@/types";

/** Max accepted size for the app artwork. */
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-caps">
        {label}
        {required && <span className="text-accent-3"> *</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-xs text-faint">{hint}</p>}
    </div>
  );
}

export default function UploadPage() {
  const { user, loading: authLoading, configured } = useAuthUser();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState<string>(APP_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [tags, setTags] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  // Revoke the object URL if the page unmounts with a preview still held.
  useEffect(
    () => () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    },
    [],
  );

  const setPreviewFile = (file: File | null) => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = file ? URL.createObjectURL(file) : null;
    setImage(file);
    setImagePreview(previewUrlRef.current);
  };

  const acceptImage = (file: File | null | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("That file is not an image. Use a PNG, JPG, WebP, or GIF up to 2 MB.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError(
        `${file.name} is ${(file.size / 1024 / 1024).toFixed(1)} MB — app images must be 2 MB or smaller.`,
      );
      return;
    }
    setError("");
    setPreviewFile(file);
  };

  const clearImage = () => {
    setPreviewFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setName("");
    setTagline("");
    setCategory(APP_CATEGORIES[0]);
    setDescription("");
    setVersion("");
    setDownloadUrl("");
    setTags("");
    clearImage();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!configured) {
      setError("Firebase is not configured — submissions are unavailable.");
      return;
    }
    if (!user) {
      setError("You must be signed in to submit an app.");
      return;
    }
    if (!name.trim() || !description.trim()) {
      setError("App name and description are required.");
      return;
    }
    if (!image) {
      setError("Add an app image before submitting.");
      return;
    }

    const db = getDb();
    const bucket = getStorageBucket();
    if (!db || !bucket) {
      setError(
        "Firebase is unavailable — set the NEXT_PUBLIC_FIREBASE_* env vars and reload.",
      );
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload the artwork to Cloud Storage.
      const imageRef = ref(
        bucket,
        `app-images/${user.uid}/${Date.now()}_${image.name}`,
      );
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Create the listing document — starts pending review.
      await addDoc(collection(db, "apps"), {
        userId: user.uid,
        name: name.trim(),
        tagline: tagline.trim() || null,
        description: description.trim(),
        category,
        imageUrl,
        downloadUrl: downloadUrl.trim() || null,
        version: version.trim() || null,
        tags: tags
          ? tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "pending",
      });

      resetForm();
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Upload failed: ${err.message}`
          : "Upload failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="page-shell flex-1 py-10">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 animate-rise">
            <div className="label-caps mb-2">For developers</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Submit your <span className="text-gradient">app</span>
            </h1>
            <p className="mt-2 max-w-xl text-muted">
              Share what you built with Nova Market. Submissions are reviewed
              before they appear on the charts.
            </p>
          </header>

          {!configured ? (
            /* ---------- Firebase not configured ---------- */
            <div className="glass rounded-2xl p-8 md:p-10 animate-rise">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-warn">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="section-title">Firebase is not configured</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    App submissions need Firebase Auth, Firestore, and Storage.
                    Add your project values to{" "}
                    <code className="font-mono text-accent-2">.env.local</code>{" "}
                    and restart the dev server:
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-bg p-4 font-mono text-xs leading-relaxed text-muted">
                    {`NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=`}
                  </pre>
                  <p className="mt-3 text-xs text-faint">
                    You can keep browsing the catalog without them — only sign-in
                    and uploads are disabled.
                  </p>
                </div>
              </div>
            </div>
          ) : authLoading ? (
            /* ---------- Auth state resolving ---------- */
            <div className="glass rounded-2xl p-10 animate-rise flex items-center justify-center gap-3 text-muted">
              <Spinner />
              <span className="text-sm">Checking your session…</span>
            </div>
          ) : !user ? (
            /* ---------- Signed out ---------- */
            <div className="glass rounded-2xl p-10 animate-rise text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-accent-2">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h2 className="section-title mt-4">Sign in to submit</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                You need a Nova Market account to upload an app for review.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link href="/login?next=/upload" className="btn-primary">
                  Sign in
                </Link>
                <Link href="/signup" className="btn-ghost">
                  Create account
                </Link>
              </div>
            </div>
          ) : submitted ? (
            /* ---------- Success ---------- */
            <div
              className="glass rounded-2xl p-10 animate-rise text-center"
              role="status"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.12)] text-good">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m5 13 4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="section-title mt-4">App submitted</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                <span className="font-medium text-good">Pending review.</span>{" "}
                Your listing will appear on Nova Market once it is approved.
              </p>
              <button
                type="button"
                className="btn-ghost mt-6"
                onClick={() => setSubmitted(false)}
              >
                Submit another app
              </button>
            </div>
          ) : (
            /* ---------- Submission form ---------- */
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 md:p-8 animate-rise"
            >
              <div className="grid gap-7 lg:grid-cols-2">
                {/* Left column — app identity */}
                <div className="space-y-5">
                  <Field id="app-name" label="App name" required>
                    <input
                      id="app-name"
                      type="text"
                      className="input-dark"
                      placeholder="e.g. Pulse"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={60}
                      required
                    />
                  </Field>

                  <Field
                    id="app-tagline"
                    label="Tagline"
                    hint="One line that sells it — shown under the name."
                  >
                    <input
                      id="app-tagline"
                      type="text"
                      className="input-dark"
                      placeholder="Your music, visualized in real time."
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      maxLength={90}
                    />
                  </Field>

                  <Field id="app-category" label="Category" required>
                    <select
                      id="app-category"
                      className="input-dark cursor-pointer"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      {APP_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="app-description" label="Description" required>
                    <textarea
                      id="app-description"
                      className="input-dark min-h-[9.5rem] resize-y"
                      placeholder="What makes it great? Features, story, what sets it apart."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Field>
                </div>

                {/* Right column — artwork + release info */}
                <div className="space-y-5">
                  <div>
                    <span className="label-caps">
                      App image <span className="text-accent-3">*</span>
                    </span>
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Upload app image"
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={(e) => {
                        const next = e.relatedTarget;
                        if (
                          !(next instanceof Node) ||
                          !e.currentTarget.contains(next)
                        ) {
                          setDragActive(false);
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        acceptImage(e.dataTransfer.files?.[0]);
                      }}
                      className={cn(
                        "mt-2 flex min-h-[13rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
                        dragActive
                          ? "border-accent bg-[rgba(124,92,255,0.10)]"
                          : "border-border bg-surface hover:border-border-strong",
                      )}
                    >
                      {imagePreview && image ? (
                        <>
                          <div className="relative">
                            <Image
                              src={imagePreview}
                              alt="App image preview"
                              width={96}
                              height={96}
                              unoptimized
                              className="h-24 w-24 rounded-2xl border border-border object-cover"
                            />
                            <button
                              type="button"
                              aria-label="Remove image"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearImage();
                              }}
                              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border-strong bg-surface-solid text-muted transition-colors hover:text-text"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6l12 12M18 6 6 18"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <p className="max-w-full truncate text-sm font-medium text-text">
                            {image.name}
                          </p>
                          <p className="text-xs text-faint">
                            {(image.size / 1024).toFixed(0)} KB — click or drop
                            to replace
                          </p>
                        </>
                      ) : (
                        <>
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="text-accent-2"
                          >
                            <path
                              d="M7 18a5 5 0 1 1 .9-9.92A6 6 0 0 1 19.5 10 4.5 4.5 0 0 1 18 18.9"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M12 12v7m0-7-3 3m3-3 3 3"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-sm font-medium text-text">
                            Drag and drop your app image
                          </p>
                          <p className="text-xs text-muted">
                            or{" "}
                            <span className="text-accent-2 underline underline-offset-2">
                              browse files
                            </span>
                          </p>
                          <p className="text-xs text-faint">
                            PNG, JPG, WebP, or GIF — max 2 MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        acceptImage(e.target.files?.[0]);
                        // Allow re-picking the same file after clearing.
                        e.target.value = "";
                      }}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="app-version" label="Version">
                      <input
                        id="app-version"
                        type="text"
                        className="input-dark"
                        placeholder="1.0.0"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                      />
                    </Field>
                    <Field id="app-download-url" label="Download URL">
                      <input
                        id="app-download-url"
                        type="url"
                        className="input-dark"
                        placeholder="https://example.com/get"
                        value={downloadUrl}
                        onChange={(e) => setDownloadUrl(e.target.value)}
                      />
                    </Field>
                  </div>

                  <Field
                    id="app-tags"
                    label="Tags"
                    hint="Comma separated — used for search."
                  >
                    <input
                      id="app-tags"
                      type="text"
                      className="input-dark"
                      placeholder="music, audio, visualizer"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </Field>
                </div>
              </div>

              <hr className="divider my-7" />

              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                {error ? (
                  <p className="text-sm text-bad" role="alert">
                    {error}
                  </p>
                ) : (
                  <p className="text-xs text-faint">
                    Fields marked * are required. Listings go live after review.
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-primary shrink-0"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      Submitting…
                    </>
                  ) : (
                    "Submit for review"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
