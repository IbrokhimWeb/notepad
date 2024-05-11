"use client";

import "@/style/index.scss";
import "@/style/keyframes.scss";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { LayoutProps } from "@/utils";
import { store } from "@/utils/store";
import { Header, Particles, ThemeProvider } from "@/components";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Notepad</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="w-full h-screen overflow-y-auto">
              <div className="w-full h-full container py-10 px-52 max-[1250px]:px-20 max-md:px-10 max-sm:px-5">
                <Header />
                {children}
                <ToastContainer position="bottom-left" autoClose={5000} />
              </div>
            </main>
            <Particles className="w-full h-screen absolute top-0 left-0 -z-10" />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
