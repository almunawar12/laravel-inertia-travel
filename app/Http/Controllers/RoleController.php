<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'permission:roles index' => ['only' => ['index']],
            'permission:roles create' => ['only' => ['create', 'store']],
            'permission:roles edit' => ['only' => ['edit', 'update']],
            'permission:roles delete' => ['only' => ['destroy']],
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = Role::select('id', 'name')
            ->when($request->search, fn($search) => $search->where('name', 'like', "%" . $request->search . "%"))
            ->latest()
            ->paginate(6)->withQueryString();

        return inertia('Roles/Index', ['roles' => $roles, 'filters' => $request->only('search')]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //get permissions
        $data = Permission::orderBy('name')->pluck('name', 'id');
        $collection = collect($data);
        $permissions = $collection->groupBy(function ($item, $key) {
            $words = explode(' ', $item);

            return $words[0];
        });

        return inertia('Roles/Create', ['permissions' => $permissions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request
        $request->validate([
            'name' => 'required|min:3|max:255|unique:roles',
            'selectedPermissions' => 'required|array|min:1'
        ]);

        // create role
        $role = Role::create(['name' => $request->name]);

        // assign permissions to role
        $role->givePermissionTo($request->selectedPermissions);

        return to_route('roles.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $data = Permission::orderBy('name')->pluck('name', 'id');
        $collection = collect($data);
        $permissions = $collection->groupBy(function ($item, $key) {
            $words = explode(' ', $item);
            return $words[0];
        });

        $role->load('permissions');
        return inertia('Roles/Edit', ['role' => $role, 'permissions' => $permissions]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:roles,name,' . $role->id,
            'selectedPermissions' => 'required|array|min:1'
        ]);

        $role->update(['name' => $request->name]);

        // sync permissions to role
        $role->syncPermissions($request->selectedPermissions);

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return back();
    }
}
