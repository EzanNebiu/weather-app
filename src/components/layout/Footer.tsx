import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const personal = {
    name: "Ezan M. Nebija",
    email: "ezannebiu8@gmail.com",
    linkedInUrl: "https://www.linkedin.com/in/ezan-nebiu-2b0966311",
    gitHubUrl: "https://github.com/EzanNebiu",
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 md:ml-32 lg:ml-48">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              {personal.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              Premium Weather Application
            </p>
          </div>

          {/* Quick Info */}
          <div className="text-center">
            <h4 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">
              Weather Data
            </h4>
            <p className="text-xs text-white/60">
              Real-time weather information with stunning 3D Earth visualization
            </p>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center sm:items-end">
            <h4 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">
              Connect
            </h4>
            <div className="flex gap-3 sm:gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Email"
                title="Email"
              >
                <EmailIcon className="text-xl sm:text-2xl" />
              </a>
              <a
                href={personal.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon className="text-xl sm:text-2xl" />
              </a>
              <a
                href={personal.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon className="text-xl sm:text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 text-center">
          <p className="text-xs sm:text-sm text-white/50">
            © {currentYear} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};