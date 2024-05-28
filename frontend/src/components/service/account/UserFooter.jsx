import React, { useState } from 'react';
import { useUsers } from '../../../contexts/UserContext';
import { Button } from '../../commons/Button';
import { IdInputField, PwInputField } from '../../commons/Input';
import { DropBox } from '../../commons/DropBox';


export function UserFooter() {
    const { handleAddUser, handleDeleteUser, selectedUser } = useUsers();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const roleOptions = ['DATA', 'AI'];
    const handleAddUserClick = () => {
        setShowAddUserForm(true);
    };

    const handleCloseAddUserForm = () => {
        setShowAddUserForm(false);
        setUsername('');
        setPassword('');
        setRole('');
    };

    const handleCreateUser = () => {
        handleAddUser(username, password, role);
        handleCloseAddUserForm();
    };

    return (
        <div className="user-footer">
            <Button color="green" className="mx-1" onClick={handleAddUserClick}>Add User</Button>
            {selectedUser && (
                <Button color="red" className="mx-1" onClick={handleDeleteUser}>Delete User</Button>
            )}

            {showAddUserForm && (
                <div className="overlay" onClick={handleCloseAddUserForm}>
                    <div className="add-user-form" onClick={(e) => e.stopPropagation()}>
                        <div className="form-group">
                            <IdInputField
                                label="id"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username"
                            />

                        </div>
                        <div className="form-group">
                            <PwInputField
                                label="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                            />
                        </div>
                        
                        <div className="form-group">
                            <DropBox
                                label="role"
                                value={role}
                                setValue={setRole} 
                                placeholder="필수"
                                options={roleOptions}
                            />
                        </div>
                        <div className="form-actions">
                            <Button color="blue" onClick={handleCreateUser}>Create User</Button>
                            <Button color="grey" onClick={handleCloseAddUserForm}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
