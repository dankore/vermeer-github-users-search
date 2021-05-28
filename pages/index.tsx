import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { InputText } from '@components/inputAndButton';
import Layout from '@components/Layout';
import { useImmer } from 'use-immer';
import LeanUserProfileCard from '@components/leanUserProfileCard';

export default function IndexPage(): JSX.Element {
    const [state, setState] = useState('');
    const [users, setUsers] = useImmer({
        isLoading: false,
        data: [],
        offset: 0,
        perPage: 8,
        currentPage: 0,
        pageCount: 0,
    });

    const currentPageData = users.data.slice(users.offset, users.offset + users.perPage);

    const handlePageClick = (e: { selected: number }) => {
        const selectedPage = e.selected;
        const offset = selectedPage * users.perPage;

        setUsers(draft => {
            draft.currentPage = selectedPage;
            draft.offset = offset;
        });
    };

    useEffect(() => {
        (async function search() {
            if (state) {
                // START LOADING
                setUsers(draft => {
                    draft.isLoading = true;
                });
                // FETCH DATA
                fetch(`https://api.github.com/search/users?q=${state}&per_page=100`)
                    .then(async res => {
                        const data = await res.json();

                        setUsers(draft => {
                            draft.data = data.items;
                            draft.pageCount = Math.ceil(data.items.length / users.perPage);
                            // STOP LOADING
                            draft.isLoading = false;
                        });
                    })
                    .catch(error => console.log(error));
            }
        })();
    }, [state]);

    return (
        <Layout title="Home">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Search GitHub Users
                </h2>
                <InputText
                    title="Type a GitHub username"
                    showAsterick={true}
                    value={state}
                    onChangeHandler={e => setState(e.target.value)}
                    id="login_email"
                    type="search"
                    isLoading={users.isLoading}
                />

                {users.data.length > 0 && (
                    <>
                        <ul className="flex flex-wrap justify-center">
                            {currentPageData.map(userData => {
                                return (
                                    <LeanUserProfileCard userData={userData} key={userData.id} />
                                );
                            })}
                        </ul>
                        {users.data.length > users.perPage && (
                            <div className="bg-white px-4 py-3 rounded-md flex items-center justify-between sm:px-6 dark:bg-gray-700">
                                <div className="sm:flex-1 sm:flex items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-200">
                                            Showing{' '}
                                            <span className="font-medium">{users.offset + 1}</span>{' '}
                                            to{' '}
                                            <span className="font-medium">
                                                {users.offset + users.perPage == 104
                                                    ? 100
                                                    : users.offset + users.perPage}
                                            </span>{' '}
                                            of{' '}
                                            <span className="font-medium">{users.data.length}</span>{' '}
                                            results
                                        </p>
                                    </div>
                                    <div>
                                        <ReactPaginate
                                            previousLabel={'prev'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={users.pageCount}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={0}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {!users.data.length && (
                    <p className="lg:rounded-lg text-center mt-5">Nothing to see here</p>
                )}
            </div>
        </Layout>
    );
}
