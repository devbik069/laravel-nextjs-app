<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        // API user
        User::firstOrCreate(
            ['email' => 'apiuser@example.com'],
            [
                'name' => 'API User',
                'password' => Hash::make('password'),
            ]
        );
    }
}
