import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 p-[10%] md:p-[5%]">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">Бидний тухай</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Компани</li>
              <li>Холбоо барих</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Үйлчилгээ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Захиалга</li>
              <li>Хүргэлт</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Тусламж</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Түгээмэл асуулт хариулт</li>
              <li>Үйлчилгээний нөхцөл</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Холбоо барих</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>+976 7533 5599</li>
              <li>info@example.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
