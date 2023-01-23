import '../styles/globals.css';
import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 h-screen overflow-auto">
        {/* <Header /> */}
        <Header />
        {children}
      </body>
    </html>
  );
}
