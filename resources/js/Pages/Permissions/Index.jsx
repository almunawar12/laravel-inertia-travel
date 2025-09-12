import Button from "@/Components/Button";
import Container from "@/Components/Container";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/Search";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import hasAnyPermissions from "resources/utils/Permissions";

export default function Index({ auth }) {
    const { permissions, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-right">
                    Permissions
                </h2>
            }
        >
            <Head title={permissions} />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermissions(["permissions create"]) && (
                        <Button url={route("permissions.create")} type={"add"}>
                            Create
                        </Button>
                    )}
                    <div className="w-full md:w-4.6">
                        <Search
                            url={route("permissions.index")}
                            placeholder={"Search permissions..."}
                            filters={filters}
                        />
                    </div>
                </div>

                <Table.Card title={"Permissions"}>
                    <Table>
                        <Table.Head>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Permission</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </tr>
                        </Table.Head>
                        <Table.Body>
                            {permissions.data.map((permissions, i)=> (
                                <tr key={{i}}>
                                    <Table.Td>{++1 + (permissions.current_page-1) * permissions.per_page}</Table.Td>
                                    <Table.Td>{permissions.name}</Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermissions([
                                                "permissions edit",
                                            ]) && (
                                                <Button
                                                    url={route(
                                                        "permissions.edit",
                                                        permissions.id
                                                    )}
                                                    type={"edit"}
                                                >
                                                    Edit
                                                </Button>
                                            )}

                                            {hasAnyPermissions([
                                                "permissions delete",
                                            ]) && (
                                                <Button
                                                    url={route(
                                                        "permissions.destroy",
                                                        permissions.id
                                                    )}
                                                    type={"delete"}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Body>
                    </Table>
                </Table.Card>
                <div className="flex items-center justify-center">
                    {permissions.last_page !== 1 && (<Pagination links={permissions.links} />)}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
