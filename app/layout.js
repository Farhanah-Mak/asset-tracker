import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Asset Tracker",
  description: "EECC Asset Tracker for Employees"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <body className="homepage_container">
        <aside className="homepage_searchSection">
          <h1 className="homepage_title">WELCOME</h1>
          <Link href="/">
            <button className="homepage_button">Home</button>
          </Link>
          <Link href="/SearchEmployee">
            <button className="homepage_button">Search Employee</button>
          </Link>
          {/* Editing the assets should be reflected throughout the app */}
          <Link href="/ListEmployee">
            <button className="homepage_button">Employee List</button>
          </Link>
          <Link href="/AddEmployee">
            {" "}
            <button className="homepage_button">Add Employee</button>
          </Link>        
          <Link href="/AssignAsset">
            {" "}
            <button className="homepage_button">Assign Assets</button>
          </Link>
        </aside>
        {children}
      </body>
    </html>
  );
}
