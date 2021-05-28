import React, { ReactNode } from 'react';
import LeanUserProfileCard from '@components/leanUserProfileCard';

interface IDisplaySearchResultProps {
    usersSearchResults: {
        isLoading: boolean,
        data: string[],
        offset: number,
        perPage: number,
        currentPage: number,
        pageCount: number,
    };
    currentPageData: Array<{ login: string, avatar_url: string, id: string }>;
    children: ReactNode;
}
export default function DisplaySearchResult({
    usersSearchResults,
    currentPageData,
    children,
}: IDisplaySearchResultProps): JSX.Element {
    return (
        <>
            <ul className="flex flex-wrap justify-center">
                {currentPageData.map(userData => {
                    return <LeanUserProfileCard userData={userData} key={userData.id} />;
                })}
            </ul>
            {usersSearchResults.data.length > usersSearchResults.perPage && (
                <div className="bg-white px-4 py-3 rounded-md flex items-center justify-between sm:px-6 dark:bg-gray-700">
                    <div className="sm:flex-1 sm:flex items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-200">
                                Showing{' '}
                                <span className="font-medium">{usersSearchResults.offset + 1}</span>{' '}
                                to{' '}
                                <span className="font-medium">
                                    {usersSearchResults.offset + usersSearchResults.perPage == 104
                                        ? 100
                                        : usersSearchResults.offset + usersSearchResults.perPage}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {usersSearchResults.data.length}
                                </span>{' '}
                                results
                            </p>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
}
