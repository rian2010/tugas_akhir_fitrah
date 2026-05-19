<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Permissions
        Permission::create(['name' => 'view data']);
        Permission::create(['name' => 'create data']);
        Permission::create(['name' => 'edit data']);
        Permission::create(['name' => 'delete data']);

        // Roles
        $rt = Role::create(['name' => 'rt']);
        $warga = Role::create(['name' => 'warga']);

        // Assign permissions

        $rt->givePermissionTo(Permission::all());

        $warga->givePermissionTo([
            'view data'
        ]);
    }
}
