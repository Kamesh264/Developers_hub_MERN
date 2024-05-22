// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next){
//     try{
//         let token = req.header('x-token');
//         if(!token){
//             return res.status(400).send('Token not found');
//         }
//         let decoded = jwt.verify(token,'jwtPassword');
//         req.user = decoded.user;
//         next();
//     }
//     catch(err){
//         console.log(err);
//         return res.status(400).send('Authentication Error');
//     }
// }

// /middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = request.headers.get('x-token');

    if (!token) {
        return NextResponse.json({ message: 'Token not found' }, { status: 400 });
    }

    const response = await fetch(new URL('/api/verify-token', request.url).toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ message: errorData.message }, { status: 400 });
    }

    const data = await response.json();
    request.user = data.user;

    return NextResponse.next();
}

