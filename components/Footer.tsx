 import { ROUTES } from "@/config/routes";
import TextLink from "./typography/TextLink";
import Title from "./typography/Title";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import Text from "./typography/Text";
import LanguageSwitcher from "./languages/LanguageSwitcher";
import { ReactNode } from "react";
import Container from "./Container";

type ISocial = {
  label: string;
  id: string;
  icon: JSX.Element;
}

const socials: ISocial[] = [
  {
    label: "Website",
    id: "website",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.246 17c-.927 3.701-2.547 6-3.246 7-.699-1-2.32-3.298-3.246-7h6.492zm7.664 0c-1.558 3.391-4.65 5.933-8.386 6.733 1.315-2.068 2.242-4.362 2.777-6.733h5.609zm-21.82 0h5.609c.539 2.386 1.47 4.678 2.777 6.733-3.736-.8-6.828-3.342-8.386-6.733zm14.55-2h-7.28c-.29-1.985-.29-4.014 0-6h7.281c.288 1.986.288 4.015-.001 6zm-9.299 0h-5.962c-.248-.958-.379-1.964-.379-3s.131-2.041.379-3h5.962c-.263 1.988-.263 4.012 0 6zm17.28 0h-5.963c.265-1.988.265-4.012.001-6h5.962c.247.959.379 1.964.379 3s-.132 2.042-.379 3zm-8.375-8h-6.492c.925-3.702 2.546-6 3.246-7 1.194 1.708 2.444 3.799 3.246 7zm-8.548-.001h-5.609c1.559-3.39 4.651-5.932 8.387-6.733-1.237 1.94-2.214 4.237-2.778 6.733zm16.212 0h-5.609c-.557-2.462-1.513-4.75-2.778-6.733 3.736.801 6.829 3.343 8.387 6.733z"/></svg>
  },
  {
    label: "Facebook",
    id: "facebook",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
  },
  {
    label: "Instagram",
    id: "instagram",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
  },
  {
    label: "GitHub",
    id: "github",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
  },
  {
    label: "LinkedIn",
    id: "linkedIn",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  },
  {
    label: "Youtube",
    id: "youtube",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
  },
];

type FooterTitleProps = {
  children: ReactNode;
}
const FooterTitle = ({ children }: FooterTitleProps) => {
  return (
    <Title level="h3" className="mb-6 sm:mb-3 md:mb-6 font-semibold text-gray-900 uppercase dark:text-white md:text-lef">
      {children}
    </Title>
  )
}

const Footer = () => {
  const t = useTranslations('Common');
  const tNavBar = useTranslations('NavBar');

  return (
    <footer className="self-stretch flex flex-col items-center sm:pt-4 md:pt-12 dark:bg-gray-800 relative">
      {/* separator */}
      <hr className="hidden md:block border-gray-200 dark:border-gray-700 relative md:absolute md:left-0 md:right-0 md:top-0" />

      {/* content */}
      <Container maxWidth="lg" className="mt-4 md:mt-0">
        <div className="md:flex md:justify-between mb-4 md:mb-0">
            {/* <div className="flex-1 mb-6 md:mb-0">
                <TextLink href="/" underline={false}>
                  Mik.
                </TextLink>
            </div> */}
            <div className="flex-1 grid grid-cols-1 gap-8 md:gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <div>
                    <FooterTitle>
                      {t('getInTouch')}
                    </FooterTitle>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-4 sm:space-y-3 md:space-y-4">
                        <li>
                          <TextLink href={siteConfig.contact.phone} underline={false} className="hover:underline">
                            {siteConfig.contact.phone}
                          </TextLink>
                        </li>
                        <li>
                          <TextLink href={`mailto:${siteConfig.contact.email}`} underline={false} className="hover:underline">
                            {siteConfig.contact.email}
                          </TextLink>
                        </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col md:items-center">
                  <div>
                      <FooterTitle>
                        {t('legal')}
                      </FooterTitle>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-4 sm:space-y-3 md:space-y-4">
                          <li className="mb-4">
                              <TextLink href="/" underline={false} className="hover:underline">Privacy Policy</TextLink>
                          </li>
                          <li>
                              <TextLink href="/" underline={false} className="hover:underline">Terms &amp; Conditions</TextLink>
                          </li>
                      </ul>
                  </div>
                </div>
                <div className="flex flex-col md:items-end">
                  <div>
                    <FooterTitle>
                      {t('ourWebsite')}
                    </FooterTitle>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-4 sm:space-y-3 md:space-y-4">
                      <li className="mb-4">
                        <TextLink href={ROUTES.about} underline={false} className="hover:underline">
                          {tNavBar('about')}
                        </TextLink>
                      </li>
                      <li>
                        <TextLink href={ROUTES.about} underline={false} className="hover:underline">
                          {tNavBar('blog')}
                        </TextLink>
                      </li>
                      <li>
                        <TextLink href={ROUTES.contact} underline={false} className="hover:underline">
                          {tNavBar('contact')}
                        </TextLink>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
        </div>
        {/* separator */}
        <hr className=" border-gray-200 dark:border-gray-700 lg:my-8 relative md:absolute md:left-0 md:right-0 md:bottom-10" />

        <div className="sm:flex sm:items-center sm:justify-between mt-4 sm:mt-1 md:mt-12">
          <Text as="span" className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()}.{" "}
            {t('allRightReserved')}.
          </Text>
          {/* socials */}
          <div className="flex mt-4 space-x-6 justify-between sm:justify-center md:mt-0">
            {socials.map((social: ISocial) => (
              <a key={social.id} href={(siteConfig.social as any)[social.id]} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                {social.icon}
              </a>
            ))}
          </div>
          {/* language switcher */}
          <div className="mt-4 md:mt-0">
            <LanguageSwitcher
              className="w-[120px]"
              inputClassName="border-none"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
