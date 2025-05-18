export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full  bg-slate-100 overflow-y-hidden">{children}</main>
  );
}
