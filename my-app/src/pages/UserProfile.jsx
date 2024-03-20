import React from 'react'
import { useSelector } from 'react-redux'
export default function UserProfile() {
    const user = useSelector(state => state.user);
    console.log(user);
    return (
        <div>
            name: {user.name}
            <br/>
            email: {user.email},
        </div>
    )
}
