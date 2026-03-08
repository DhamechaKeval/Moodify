import { RouterProvider } from "react-router";
//import FaceExpression from "./features/Expression/components/FaceExpression";
import { Router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { SongProvider } from "./features/Home/song.context";

function App() {
  return (
    <>
      <AuthProvider>
        <SongProvider>
          <RouterProvider router={Router} />
        </SongProvider>
      </AuthProvider>
    </>
  );
}

export default App;
