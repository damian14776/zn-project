import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/app';

interface FilterColumnProps {
    onFilter: (userId: string) => void;
    selectedUserId: string;
}

const FilterColumn: React.FC<FilterColumnProps> = ({ onFilter, selectedUserId }) => {
    const [users, setUsers] = useState<any[]>([]); // Users state

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers); // Set users to state
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Filter by User</h4>
            <select
                onChange={(e) => onFilter(e.target.value)}
                value={selectedUserId} // Control the value of the dropdown
                className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Users</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterColumn;
