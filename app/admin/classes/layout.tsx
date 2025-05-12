export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const classes = await getAllClassesWithStudentCount();

  return <div>{children}</div>;
}
