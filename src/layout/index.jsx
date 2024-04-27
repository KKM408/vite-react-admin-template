import React, { Component, Suspense } from 'react';
import { Outlet } from "react-router-dom";

function index() {
  return (
    <div>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default index;
