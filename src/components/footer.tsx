import { Footer } from "flowbite-react";
import { FC, SVGProps } from "react";

export const Footer2 = () => {
  const icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg> as unknown as FC<SVGProps<SVGSVGElement>>

  return (
    <Footer
     bgDark={true}>
    <div className="w-full place-self-end">
      <div className="grid w-full grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        <div>
          <Footer.Title title="Company"/>
          <Footer.LinkGroup col={true} className="grid">
            <Footer.Link href="#">
              About
            </Footer.Link>
            <Footer.Link href="#">
              Careers
            </Footer.Link>
            <Footer.Link href="#">
              Brand Center
            </Footer.Link>
            <Footer.Link href="#">
              Blog
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title title="help center" />
          <Footer.LinkGroup col={true}>
            <Footer.Link href="#">
              Discord Server
            </Footer.Link>
            <Footer.Link href="#">
              Twitter
            </Footer.Link>
            <Footer.Link href="#">
              Facebook
            </Footer.Link>
            <Footer.Link href="#">
              Contact Us
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title title="legal" />
          <Footer.LinkGroup col={true}>
            <Footer.Link href="#">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#">
              Licensing
            </Footer.Link>
            <Footer.Link href="#">
              Terms & Conditions
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title title="download" />
          <Footer.LinkGroup col={true}>
            <Footer.Link href="#">
              iOS
            </Footer.Link>
            <Footer.Link href="#">
              Android
            </Footer.Link>
            <Footer.Link href="#">
              Windows
            </Footer.Link>
            <Footer.Link href="#">
              MacOS
              
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
      <div className="w-full bg-gray-500 py-6 px-4 sm:flex sm:items-center sm:justify-between">
        
        <Footer.Copyright
          href="#"
          by="Teclu Mobility™"
          year={2023}
          className="text-white"
        />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">

            <a href="#" className="">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="35px" height="35px"> 
            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"/></svg>
            </a>
            <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="35px" height="35px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M10.496,8.403 c0.842,0,1.403,0.561,1.403,1.309c0,0.748-0.561,1.309-1.496,1.309C9.561,11.022,9,10.46,9,9.712C9,8.964,9.561,8.403,10.496,8.403z M12,20H9v-8h3V20z M22,20h-2.824v-4.372c0-1.209-0.753-1.488-1.035-1.488s-1.224,0.186-1.224,1.488c0,0.186,0,4.372,0,4.372H14v-8 h2.918v1.116C17.294,12.465,18.047,12,19.459,12C20.871,12,22,13.116,22,15.628V20z"/></svg>
            </a>
          {/* <Footer.Icon
            href="#"
            icon={icon}
          /> */}
          {/* <Footer.Icon
            href="#"
            icon={icon}
          />
          <Footer.Icon
            href="#"
            icon={icon}
          />
          <Footer.Icon
            href="#"
            icon={icon}
          />
          <Footer.Icon
            href="#"
            icon={icon}
          /> */}
        </div>
      </div>
    </div>
  </Footer>
  );
};