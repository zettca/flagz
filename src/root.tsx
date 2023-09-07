// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";

import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Flag Quiz</Title>
        <Meta charset="utf-8" />
        <Link rel="icon" href="flags.svg" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="Country Flag Quiz Game" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
