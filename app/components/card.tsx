export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {children}
    </div>
  );
}
