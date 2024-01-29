export default function About() {
  return (
    <div>
      <header className="text-3xl font-semibold mb-6 text-center mt-4">About Us</header>

      <div className="flex justify-between p-6">
        <div className="flex-1">
          {/* Left Side Column with Image */}
          <img src="loginLogo.png" alt="About Us Image" className="max-w-full h-auto" />
        </div>

        <div className="flex-1 pl-6">
          {/* Right Side Column with Content */}
          <h2 className="text-2xl font-semibold">Welcome to Foot Docker</h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere sapiente laudantium ipsa impedit fuga quis labore adipisci nihil quisquam unde dignissimos, voluptate doloremque, inventore, cupiditate maxime animi aliquam?
            Quibusdam animi ipsam sunt cupiditate distinctio fugiat velit in illo blanditiis. Illum, facere. Iste qui obcaecati accusamus numquam consequatur, temporibus culpa necessitatibus quis minima quod nam aliquid omnis laborum dolor,
            perferendis, ipsum nostrum odit debitis odio. Voluptatum porro quam laboriosam dolorum unde libero obcaecati, fugit adipisci voluptas dolorem veniam ad, perferendis expedita itaque inventore dicta magni aliquid placeat
            laudantium natus reprehenderit molestiae. Natus modi eos dolorem soluta deserunt magnam maxime assumenda. Necessitatibus?
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere sapiente laudantium ipsa impedit fuga quis labore adipisci nihil quisquam unde dignissimos, voluptate doloremque, inventore, cupiditate maxime animi aliquam?
            Quibusdam animi ipsam sunt cupiditate distinctio fugiat velit in illo blanditiis. Illum, facere. Iste qui obcaecati accusamus numquam consequatur, temporibus culpa necessitatibus quis minima quod nam aliquid omnis laborum dolor,
            perferendis, ipsum nostrum odit debitis odio. Voluptatum porro quam laboriosam dolorum unde libero obcaecati, fugit adipisci voluptas dolorem veniam ad, perferendis expedita itaque inventore dicta magni aliquid placeat
            laudantium natus reprehenderit molestiae. Natus modi eos dolorem soluta deserunt magnam maxime assumenda. Necessitatibus?
          </p>
          {/* Add more content as needed */}
        </div>
      </div>

      {/* Add your footer or additional sections here */}
    </div>
  );
}
