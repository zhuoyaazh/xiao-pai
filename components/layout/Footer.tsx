export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold text-pink-500">小派 XIAO PAI</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Satu kampus, satu geng. Apa aja dibantuin.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/browse" className="hover:text-pink-500">Browse PO</a></li>
              <li><a href="/driver-jobs" className="hover:text-pink-500">Driver Jobs</a></li>
              <li><a href="/helper-jobs" className="hover:text-pink-500">Helper Jobs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Hubungi Kami</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>📧 support@xiaopai.campus</li>
              <li>💬 Feedback & Bug Report</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          <p>&copy; 2025 XIAO PAI. Made with ❤️ for campus communities.</p>
        </div>
      </div>
    </footer>
  );
}
