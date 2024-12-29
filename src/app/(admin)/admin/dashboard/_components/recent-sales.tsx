import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>ОБ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Отгонбаяр Д.</p>
          <p className="text-sm text-muted-foreground">
            otgoo@gmail.com
          </p>
        </div>
        <div className="ml-auto font-medium">+125,000₮</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>БД</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Батдорж Б.</p>
          <p className="text-sm text-muted-foreground">
            batdorj@gmail.com
          </p>
        </div>
        <div className="ml-auto font-medium">+45,000₮</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>ЭЭ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Энхжаргал Э.</p>
          <p className="text-sm text-muted-foreground">
            enkhjargal@gmail.com
          </p>
        </div>
        <div className="ml-auto font-medium">+85,000₮</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>ГБ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ганбаатар О.</p>
          <p className="text-sm text-muted-foreground">
            ganbaatar@gmail.com
          </p>
        </div>
        <div className="ml-auto font-medium">+165,000₮</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>СБ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Сарангэрэл Б.</p>
          <p className="text-sm text-muted-foreground">
            sarangerel@gmail.com
          </p>
        </div>
        <div className="ml-auto font-medium">+35,000₮</div>
      </div>
    </div>
  )
}

