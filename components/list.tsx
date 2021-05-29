import { UserIcon } from '@heroicons/react/outline';
import React from 'react';

interface IUserProfileCard {
    userData: {
        login: string,
        avatar_url: string,
        id: string,
        type?: string,
    };
}

export default function List({ userData }: IUserProfileCard): JSX.Element {
    console.log(userData);
    return (
        <li>
            <a
                href={`/users/${userData.login}`}
                className="block hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
                <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-indigo-600 dark:text-gray-50 truncate">
                            {userData.login}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-50">
                                Account Type
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm text-gray-500">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={userData.avatar_url}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-50">
                            <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-100" />
                            {userData.type}
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
}
