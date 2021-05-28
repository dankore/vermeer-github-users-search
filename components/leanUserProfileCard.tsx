import React from 'react';
const defaultProfilePicture = (id: string): string => `https://avatar.tobi.sh/${id}`;

interface IUserProfileCard {
    userData: {
        login: string,
        avatar_url: string,
        id: string,
    };
}
export default function LeanUserProfileCard({ userData }: IUserProfileCard): JSX.Element {
    return (
        <a
            href={`/users/${userData.login}`}
            className="font-sans leading-tight bg-grey-lighter p-8 w-56"
        >
            <div className="max-w-sm mx-auto bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                <div
                    className="bg-cover h-20 flex justify-center"
                    style={{
                        backgroundImage: `url(${defaultProfilePicture(userData.id)})`,
                    }}
                ></div>
                <div className="px-4 pb-6">
                    <div className="flex justify-center">
                        <img
                            className="h-16 w-16 rounded-full border-4 border-white -mt-5"
                            src={userData.avatar_url}
                            alt="profile avatar"
                        />
                    </div>
                    <div className="py-2">
                        <h3 className="font-semibold mb-1 text-center">{userData.login}</h3>
                    </div>
                </div>
            </div>
        </a>
    );
}
