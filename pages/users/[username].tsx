import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Layout from '@components/Layout';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import LoadingDotsIcon from '@components/loadingDotsAnimation';

interface IUserProfileCard {
    login: string;
    avatar_url: string;
    id: number;
    name: string;
    location: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
}

export default function UserProfilePage(): JSX.Element {
    const defaultProfilePicture = (id: string): string => `https://avatar.tobi.sh/${id}`;
    const router = useRouter();
    const { username } = router.query;
    const [userProfileData, setUserProfileData] = useState<IUserProfileCard>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (username) {
            (async function getUserData() {
                try {
                    setIsLoading(true);
                    const response = await fetch(`https://api.github.com/users/${username}`);
                    const data = await response.json();

                    setUserProfileData(data);
                    setIsLoading(false);
                } catch (error) {}
            })();
        }
    }, [username]);

    if (isLoading) return <LoadingDotsIcon />;

    return (
        <Layout title={username ?? '...'}>
            <div className="font-sans leading-tight bg-grey-lighter p-8">
                <div className="max-w-sm mx-auto bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div
                        className="bg-cover h-40"
                        style={{
                            backgroundImage: `url(${defaultProfilePicture(
                                userProfileData?.id?.toString()
                            )})`,
                        }}
                    ></div>
                    <div className="border-b px-4 pb-6 dark:border-gray-600">
                        <div className="text-center sm:text-left sm:flex mb-4">
                            <img
                                className="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4"
                                src={userProfileData?.avatar_url}
                                alt="profile avatar"
                            />
                            <div className="py-2">
                                <h3 className="font-bold text-2xl mb-1">{userProfileData?.name}</h3>
                                {userProfileData?.location && (
                                    <div className="inline-flex text-gray-500 dark:text-gray-300 sm:flex items-center">
                                        <LocationMarkerIcon className={`h-6 w-6  mr-1`} />
                                        {userProfileData?.location}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="dark:text-gray-200 pl-2">{userProfileData?.bio}</div>
                    </div>
                    <div className="px-4 py-4">
                        <div className="flex items-center text-grey-darker mb-4">
                            <span>
                                <div className="flex justify-center py-4 pt-8 lg:pt-4">
                                    <div className="p-3 mr-4 text-center">
                                        <div className="text-sm text-gray-500 dark:text-gray-200 leading-5 hover:text-gray-800 focus:outline-none ">
                                            <span className="block text-xl font-bold tracking-wide text-gray-700 dark:text-gray-100 uppercase">
                                                {userProfileData?.followers}
                                            </span>
                                            Followers
                                        </div>
                                    </div>
                                    <div className="p-3 mr-4 text-center">
                                        <div className="text-sm text-gray-500 dark:text-gray-200 leading-5 hover:text-gray-800 focus:outline-none ">
                                            <span className="block text-xl font-bold tracking-wide text-gray-700 dark:text-gray-100 uppercase">
                                                {userProfileData?.following}
                                            </span>
                                            Following
                                        </div>
                                    </div>
                                    <div className="p-3 text-center lg:mr-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-200 leading-5 hover:text-gray-800 focus:outline-none ">
                                            <span className="block text-xl font-bold tracking-wide text-gray-700 dark:text-gray-100 uppercase">
                                                {userProfileData?.public_repos}
                                            </span>
                                            Repos
                                        </div>
                                    </div>
                                    <div className="p-3 text-center lg:mr-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-200 leading-5 hover:text-gray-800 focus:outline-none ">
                                            <span className="block text-xl font-bold tracking-wide text-gray-700 dark:text-gray-100 uppercase">
                                                {userProfileData?.public_gists}
                                            </span>
                                            Gists
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
