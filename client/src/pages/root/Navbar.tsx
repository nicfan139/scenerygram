import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMap, FiChevronRight, FiMenu } from 'react-icons/fi';
import { Avatar, Modal, Heading } from '@/components';
import { useScreenContext } from '@/contexts';
import { handleLogout } from '@/helpers';

interface INavbarProps {
  currentUser: TUser;
}

const Navbar = ({ currentUser }: INavbarProps): ReactElement => {
  const { isDesktop, isMobile } = useScreenContext();

  const [mobileMenuOpen, toggleMobileMenu] = useState<boolean>(false);

  return (
    <nav className="z-40 fixed top-0 left-0 right-0 md:relative flex justify-between items-center md:justify-center md:mb-6 p-4 text-white bg-slate-900">
      <Link
        to="/posts"
        className="flex gap-2 items-center text-3xl text-white hover:text-white"
      >
        <FiMap />
        <h1>Scenerygram</h1>
      </Link>

      {isDesktop && (
        <div className="absolute top-3 right-4 flex gap-6 items-center">
          <Link to="/profile" className="flex gap-2 items-center text-white hover:text-white">
            <Avatar imgUrl={currentUser.avatarUrl} size="small" className="border-white" />

            <div className="flex flex-col">
              <label>{currentUser.username}</label>
              <label className="flex items-center -ml-1 text-sm">
                <FiChevronRight />
                My Profile
              </label>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="border-white text-white hover:text-black hover:bg-white hover:border-white"
          >
            Logout
          </button>
        </div>
      )}

      {isMobile && (
        <>
          {mobileMenuOpen && (
            <Modal
              isOpen={mobileMenuOpen}
              onClose={() => toggleMobileMenu(false)}
            >
              <div className='w-full max-w-sm flex flex-col mt-6 mx-auto text-2xl'>
                <Heading>
                  <h2 className='flex gap-2 items-center text-slate-900 text-4xl'>
                    <FiMap />
                    Scenerygram
                  </h2>
                </Heading>

                <Link
                  to="/posts"
                  onClick={() => toggleMobileMenu(false)}
                  className="flex gap-2 items-center my-4 text-slate-900"
                >
                  <FiChevronRight />
                  Posts
                </Link>

                <Link
                  to="/profile"
                  onClick={() => toggleMobileMenu(false)}
                  className="flex gap-2 items-center my-4 text-slate-900"
                >
                  <FiChevronRight />
                  Profile
                </Link>
                
                <button
                  type="button"
                  onClick={() => handleLogout()}
                  className="flex gap-2 items-center my-4 p-0 border-0 text-slate-900"
                >
                 <FiChevronRight />
                  Logout
                </button>
              </div>
            </Modal>
          )}

          <button
            type="button"
            onClick={() => toggleMobileMenu(true)}
            className='p-0 border-0 text-3xl text-white hover:text-white'
          >
            <FiMenu />
          </button>
        </>
      )}
    </nav>
  )
}

export default Navbar;