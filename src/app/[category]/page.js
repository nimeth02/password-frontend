"use client"

import { axiosInstance } from "@/app/config/axios.config";
import { Button, Card, CardBody, CardFooter, Dialog, Input, Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const initialItem = { title: "", username: "", password: "", tagName: "", tagValue: "", search: "" }
function Home({ params }) {

    const router = useRouter()

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [passwordlist, setPasswordlist] = useState([])
    const [operation, setOperation] = useState()

    const [item, setItem] = useState(initialItem)
    const [description, setDescription] = useState([])
    const { title, username, password, tagName, tagValue, search } = item

    const handleAddOpen = () => setAddOpen((cur) => !cur);
    const handleEditOpen = () => setEditOpen((cur) => !cur);
    const handleDeleteOpen = () => setDeleteOpen((cur) => !cur);
    const handleEmailOpen = () => setEmailOpen((cur) => !cur);

    const addDescription = () => {
        if (!tagName || !tagValue) return
        setDescription((d) => ([...d, { tagName: tagName, tagValue: tagValue }]))
        setItem((i) => ({ ...i, tagName: "", tagValue: "" }))
    }

    const handleAddSubmit = async () => {
        const body = {
            title,
            username, password, category: params.category, description
        }
        console.log(body)
        setItem(initialItem)
        setDescription([])
        const { data } = await axiosInstance.post('api/password', body)
        if (data) {
            setPasswordlist((pl) => [...pl, data])
        }
        console.log(data)
    }

    const handleDeleteSubmit = async () => {
        console.log("delete submit");
        const { data } = await axiosInstance.delete(`api/password/${operation?._id}`)
        if (data.deletedCount == 1) {
            setPasswordlist((pl) => pl.filter((f) => f._id != operation._id))
            console.log(data, passwordlist)
        }

    }

    const handleEditSubmit = async () => {
        try {
            console.log("edit submit", item, "operation",operation);
        const body = {
            title,
            username, password, category: params.category, description
        }
        console.log(body)
        setItem(initialItem)
        setDescription([])
        const { data } = await axiosInstance.put(`api/password/${operation?._id}`, body)
        if (data) {
            setPasswordlist((pl) => (pl.filter((p)=> operation._id != p._id)))
            setPasswordlist((pl) => [...pl, data])
        }
        console.log(data)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {

        async function fetch() {
            try {
                const { data } = await axiosInstance.post('api/password/search', {
                    category: params.category,
                    search
                })
                console.log(data)
                setPasswordlist(data)
            } catch (error) {
                console.log(error)
                if(error.response.status == 401)router.push('/signin')
                
            }
           
        }
        fetch()


    }, [search])


    return (
        <div className=' p-16 md:px-32 lg:px-40 w-full flex flex-col gap-10'>


            <div className="flex  items-center justify-center md:justify-start gap-4 bg-cyan-800 px-4 py-6 rounded-t-lg ">

                <div className="flex flex-col md:flex-row  gap-5 md:gap-10 ">
                    <Input  color="white" label="Search Title"
                        value={search} onChange={(e) => setItem((i) => ({ ...i, search: e.target.value }))}
                    />
                    <Button color="green" className="w-full" onClick={handleAddOpen} ><div>Add Password</div></Button>


                </div>
            </div>



            {passwordlist.map((p) =>
                <div key={p._id} className='  w-full rounded-xl bg-gray-700  text-white flex flex-col justify-center items-center shadow-[0_0px_10px_0px_rgba(0,130,140,0.3)] '>
                    <div className=" flex flex-col md:flex-row  items-center gap-10 md:gap-12 lg:gap-40 w-full border-b-2 bg-cyan-800  border-gray-400 text-md md:text-lg px-6 py-2 rounded-xl ">
                        <div className="md:flex-1">
                            {p.title}
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row justify-end gap-5 ">
                            <Button color="amber" onClick={() => { handleEditOpen(); setOperation(p);setDescription(p.description); setItem({ title: p.title, username: p.username, password: p.password, tagName: p.tagName, tagValue: p.tagValue }) }}>Edit</Button>
                            <Button color="red" onClick={() => { handleDeleteOpen(); setOperation(p) }}>Delete</Button>
                        </div>
                    </div>
                    <div className="w-full py-6 px-6 flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20">
                            <div className="">
                                Username : {p.username}
                            </div>
                            <div className="">
                                password : {p.password}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                            {p?.description?.map((d) => <div className="">
                                {d.tagName} : {d.tagValue}
                            </div>)}
                            {/* <div className="">
                        name : d.p.h.y rathnapala
                    </div> */}
                        </div>

                    </div>


                </div>
            )
            }

            <Dialog
                size="md"
                open={addOpen}
                handler={handleAddOpen}
                className="bg-transparent shadow-none"
            >
                <Card className=" ">
                    <CardBody className="flex flex-col gap-4">
                        <div className="text-lg flex justify-center text-black">
                            Create Password
                        </div>

                        <div className="-mb-2 text-black" variant="h6">
                            Title
                        </div>
                        <Input label="Title" size="lg" value={title} onChange={(e) => setItem((i) => ({ ...i, title: e.target.value }))} />
                        <div className="flex flex-col sm:flex-row  justify-between gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="-mb-2 text-black" variant="h6">
                                    Username
                                </div>
                                <Input label="Username" size="lg" value={username} onChange={(e) => setItem((i) => ({ ...i, username: e.target.value }))} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="-mb-2 text-black" variant="h6">
                                    Password
                                </div>
                                <Input label="Password" size="lg" value={password} onChange={(e) => setItem((i) => ({ ...i, password: e.target.value }))} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="-mb-2 text-black" variant="h6">
                                Other details
                            </div>
                            <div className="flex flex-col sm:flex-row  justify-between gap-5">
                                <div className="flex flex-col gap-2">

                                    <Input label="Tagname" size="lg" value={tagName} onChange={(e) => setItem((i) => ({ ...i, tagName: e.target.value }))} />
                                </div>
                                <div className="flex flex-col gap-2">

                                    <Input label="detail" size="lg" value={tagValue} onChange={(e) => setItem((i) => ({ ...i, tagValue: e.target.value }))} />
                                </div>
                            </div>
                            <Button className="w-[100px] self-end" color="amber" onClick={addDescription}>Add</Button>

                            <div className="flex flex-col gap-2">
                                {description.map(({ tagName, tagValue }, id) =>
                                (
                                    <div key={id} className=" bg-gray-200 rounded-sm shadow-md p-2 flex justify-between">
                                        <div className="flex">
                                            <div className="text-black px-2">{tagName}</div> : {tagValue}
                                        </div>
                                        <div onClick={() => { setDescription((description) => { let arr = description.filter((d) => d.tagName !== tagName); return arr }) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>

                                ))}


                            </div>

                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" color="green" onClick={() => { handleAddOpen(); handleAddSubmit() }} fullWidth>
                            Create password
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>


            <Dialog
                size="sm"
                open={deleteOpen}
                handler={handleDeleteOpen}
                className="bg-transparent shadow-none"
            >
                <Card className=" ">
                    <CardBody className="flex flex-col gap-4">
                        <div className="text-lg flex justify-center text-black">
                            Delete Password
                        </div>

                        <div className="-mb-2 text-black flex justify-center p-2 bg-gray-400" variant="h6">
                            Title : {operation?.title}
                        </div>

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" color="red" onClick={() => { handleDeleteOpen(); handleDeleteSubmit() }} fullWidth>
                            Delete password
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
            <Dialog
                size="sm"
                open={editOpen}
                handler={handleEditOpen}
                className="bg-transparent shadow-none"
            >
                <Card className=" ">
                    <CardBody className="flex flex-col gap-4">
                        <div className="text-lg flex justify-center text-black">
                            Edit Password
                        </div>

                        <div className="-mb-2 text-black" variant="h6">
                            Title
                        </div>
                        <Input label="Title" size="lg" value={title} onChange={(e) => setItem((i) => ({ ...i, title: e.target.value }))} />
                        <div className="flex flex-col sm:flex-row justify-between gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="-mb-2 text-black" variant="h6">
                                    Username
                                </div>
                                <Input label="Username" size="lg" value={username} onChange={(e) => setItem((i) => ({ ...i, username: e.target.value }))} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="-mb-2 text-black" variant="h6">
                                    Password
                                </div>
                                <Input label="Password" size="lg" value={password} onChange={(e) => setItem((i) => ({ ...i, password: e.target.value }))} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="-mb-2 text-black" variant="h6">
                                Other details
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between gap-5">
                                <div className="flex flex-col gap-2">

                                    <Input label="Tagname" size="lg" value={tagName} onChange={(e) => setItem((i) => ({ ...i, tagName: e.target.value }))} />
                                </div>
                                <div className="flex flex-col gap-2">

                                    <Input label="detail" size="lg" value={tagValue} onChange={(e) => setItem((i) => ({ ...i, tagValue: e.target.value }))} />
                                </div>
                            </div>
                            <Button className="w-[100px] self-end" color="amber" onClick={addDescription}>Add</Button>

                            <div className="flex flex-col gap-2">
                                {description?.map(({ tagName, tagValue }, id) =>
                                (
                                    <div key={id} className=" bg-gray-200 rounded-sm shadow-md p-2 flex justify-between">
                                        <div className="flex">
                                            <div className="text-black px-2">{tagName}</div> : {tagValue}
                                        </div>
                                        <div onClick={() => { setDescription((description) => { let arr = description.filter((d) => d.tagName !== tagName); return arr }) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>

                                ))}


                            </div>

                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" color="green" onClick={() => { handleEditOpen(); handleEditSubmit() }} fullWidth>
                            Edit
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    )
}

export default Home