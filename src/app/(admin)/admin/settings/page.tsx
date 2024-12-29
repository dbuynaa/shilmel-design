import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Тохиргоо</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Профайл</TabsTrigger>
          <TabsTrigger value="store">Дэлгүүр</TabsTrigger>
          <TabsTrigger value="notifications">Мэдэгдэл</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Профайл мэдээлэл</CardTitle>
              <CardDescription>
                Профайл мэдээллээ шинэчлэх
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Нэр</Label>
                <Input id="name" placeholder="Таны нэр" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Имэйл</Label>
                <Input id="email" placeholder="name@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Био</Label>
                <Textarea id="bio" placeholder="Өөрийн тухай товч танилцуулга" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Хадгалах</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Нууц үг солих</CardTitle>
              <CardDescription>
                Нууц үгээ шинэчлэх
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Одоогийн нууц үг</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">Шинэ нууц үг</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Шинэ нууц үг давтах</Label>
                <Input id="confirm" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Хадгалах</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

