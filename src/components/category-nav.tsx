import Image from "next/image"; // Import Image component

const categories = [
  {
    id: "1",
    name: "Ажлын хувцас",
    icon: () => (
      <Image
        src="/icons/Frame.svg"
        alt="Logo"
        width={24}
        height={24}
        className="h-14 w-14"
      />
    ),
  },
  {
    id: "2",
    name: "Өврийн хувцас",
    icon: () => (
      <Image
        src="/icons/Frame (1).svg"
        alt="Logo"
        width={24}
        height={24}
        className="h-14 w-14"
      />
    ),
  },
  {
    id: "3",
    name: "Пальто",
    icon: () => (
      <Image
        src="/icons/Frame (2).svg"
        alt="Logo"
        width={24}
        height={24}
        className="h-14 w-14"
      />
    ),
  },
  {
    id: "4",
    name: "Хантааз",
    icon: () => (
      <Image
        src="/icons/Frame (3).svg"
        alt="Logo"
        width={24}
        height={24}
        className="h-14 w-14"
      />
    ),
  },
  {
    id: "5",
    name: "Нэмэлт хэрэгсэл",
    icon: () => (
      <Image
        src="/icons/Frame (4).svg"
        alt="Logo"
        width={24}
        height={24}
        className="h-14 w-14"
      />
    ),
  },
  {
    id: "6",
    name: "Дэгжин хэрэгсэл",
    icon: () => (
      <Image
        src="/icons/Frame (5).svg"
        alt="Logo"
        width={24}
        height={24}
        className="h-14 w-14"
      />
    ),
  },
];

export function CategoryNav() {
  return (
    <div className="container py-8 px-[10%] md:px-[5%]">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-accent"
            >
              <Icon />
              <span className="text-center text-sm">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
