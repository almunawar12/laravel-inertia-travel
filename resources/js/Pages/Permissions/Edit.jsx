import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";

export default function Edit({ auth }) {
    const { permissions } = usePage().props;

    const { data, setData, put, errors } = useForm({
        name: permissions.name,
        _method: "PUT",
    });

    const handleUpdateData = async (e) => {
        e.preventDefault();

        put(route("permissions.update", permissions.id), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Permission updated successfully",
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
            <Head title={"Edit Permission"} />
            <Container>
                <Card title={"Edit Permission"}>
                    <form onSubmit={handleUpdateData}>
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
                            <Button type={"submit"}>Update</Button>
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
