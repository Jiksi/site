export function Small({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <small className="flex text-sm text-gray-500 mb-3">{children}</small>;
}
