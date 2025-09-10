import { usePage } from "@inertiajs/react";
import React from "react";

export default function hasAnyPermissions(permissions) {
    const { auth } = usePage().props;

    let allPermissions = auth.permissions;

    let hasPermission = false;

    permissions.forEach(function (item) {
        if (allPermissions[item]) {
            hasPermission = true;
        }
    });

    return hasPermission;
}
