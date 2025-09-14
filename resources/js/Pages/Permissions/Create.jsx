import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route("permissions.store"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Permission created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-right">
                    Permissions
                </h2>
            }
        >
            <Head title={"Create Permission"} />
            <Container>
                <Card title={"Create new Permission"}>
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input
                                label={"Permission Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                error={errors.name}
                                placeholder={"Enter permission name"}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type={"submit"}>Save</Button>
                            <Button
                                url={route("permissions.index")}
                                type={"cancel"}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
