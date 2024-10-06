import {useState} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"

export default function Admin() {

    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);

    const handleAdd = () => {
        setAdd(!add);
        setEdit(false);
        setRemove(false);
    }

    const handleEdit = () => {
        setEdit(!edit);
        setAdd(false);
        setRemove(false);
    }

    const handleRemove = () => {
        setRemove(!remove);
        setAdd(false);
        setEdit(false);
    }

    return (
        <div className="h-screen bg-white">
            <div className="flex items-center justify-between w-full px-5">
                <h1 className="text-4xl font-medium mt-5">Página do Administrador</h1>
                <div className="flex items-center space-x-4 mt-5">
                    <button onClick={handleAdd} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Adicionar
                    </button>
                    <button className="bg-black hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        Editar
                    </button>
                    <button className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Remover
                    </button>
                </div>
            </div>
            <div className="h-5/6 w-full flex items-center justify-center">
            {   add ?
                    <Card className="w-[350px]">
                    <CardHeader>
                      <CardTitle>Create project</CardTitle>
                      <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your project" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Framework</Label>
                            <Select>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="next">Next.js</SelectItem>
                                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                <SelectItem value="astro">Astro</SelectItem>
                                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Deploy</Button>
                    </CardFooter>
                  </Card>
                  :
                <h1 className="font-xl ">Essa é a página do administrador! Selecione uma operação acima para inserir, atualizar ou remover um post inserido no portfolio!</h1>
            
            }
            </div>


        </div>
    );
}