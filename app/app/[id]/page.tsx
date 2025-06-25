import React from 'react';

const AppDetailsPage = ({ params }: { params: { id: string } }) => (
  <div>App Details for {params.id}</div>
);

export default AppDetailsPage; 