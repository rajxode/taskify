import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]/80 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
          © 2023 TimeTrack Pro. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}

