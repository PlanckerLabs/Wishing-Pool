"use client";

import { useEffect, useState } from 'react';
import * as React from 'react';
import { useSignMessage, useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import YoruAbi from '@/abi/ugly/WisherIssuer.json'
const Datastore = require('nedb');
import { ethers } from 'ethers';

const db = new Datastore({ filename: 'datafile.db', autoload: true });
const wishdb = new Datastore({ filename: 'wishlist.db', autoload: true });
const Power = new Datastore({ filename: 'power.db', autoload: true });
// db.remove({}, { multi: true }, function (err, numRemoved) {
// });
// wishdb.remove({}, { multi: true }, function (err, numRemoved) {
// });
// Power.remove({}, { multi: true }, function (err, numRemoved) {
// });

const Hero = () => {

  const recoveredAddress = React.useRef<string>()
  const wisthtextInput = React.useRef<any>()
  const [wishs, setWishs] = useState([]);
  const [singusers, setSingUsers] = useState([]);
  const [power, setPower] = useState(0);
  const [powers, setPowers] = useState([]);
  const { address, isConnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {

      Power.find({ address: address }, function (err, docs) {
        console.log('Power', docs);
        if (docs.length > 0) {
          setPowers(docs);
          setPower(docs[0].power);
        }
        //setPower(docs.power);
      });
    },
  })
  const { error: switchNetWorkError, isLoading: switchNetworkLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const { data, error: signMessageError, isLoading: signMessageLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
      recoveredAddress.current = address
      const user = { address: recoveredAddress.current, date: new Date() };

      db.find({ address: user.address }, function (err, docs) {
        if (docs.length == 0) {
          db.insert(user, function (err, newDoc) {
            // console.log('ccc')
            // console.log(newDoc)
            console.log(err)
            db.find({}, function (err, ccc) {
              //console.log('abc')
              setSingUsers(ccc);
              //console.log(ccc);
            });
            // Do something with the newly inserted data
          });
        }
      });


    },
  })

  const { chain } = useNetwork()

  useEffect(() => {
    db.find({}, function (err, docs) {
      console.log(docs);
      setSingUsers(docs);
    });
    wishdb.find({}, function (err, docs) {
      console.log('wishdb', docs);
      setWishs(docs);
    });
  }, []);
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Why We Need the Wishing Pool?
                </h1>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  In real life, a Wishing Pool is a place where people reflect on and express their inner hopes for the future. It transcends cultural and geographical barriers and exists widely in every corner of society where people have hopes for better social realities. Through ritualistic gestures, people entrust their wishes to gods or the universe. Alternatively, by sharing their wishes with those around them through sincere and imaginative public expressions in this symbolic public space, people create connections between individuals, and give blessings to each other.
                </p>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  Every wish, whether private or public, is a call from the individual to the desired reality in their heart. The Wishing Pool is where these diverse social calls converge. Based on physical space, the Wishing Pool can only convey these wishes to a limited extent. The process of making wishes come true depends more on the individual's efforts, or the favor of the gods.
                </p>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  In today's era of information technology, if we could link each other's wishes through the internet, and let these imaginative wishes for society be seen by each other, perhaps we could connect more people with similar expectations, and make some consensus wishes come true.
                </p>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  Building a globally shared Wishing Pool based on blockchain infrastructure is to make the social calls of this era visible to the public and to truly trigger them to become a certain reality.
                </p>
                <p className="pb-5">
                  Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world. ——Albert Einstein
                </p>
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Making Wishes, as a Form of Social Imagination
                </h1>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">


                  When we say "we want to build a better world", what specific realities does this wish refer to?



                  Individuals from different cultural backgrounds will have radically different concrete expressions when imagining a better society. These diverse expressions are not created out of thin air; rather, they stem from a profound understanding and experience of the current situation, and extract expectations for this reality from the sensory experience of real life.



                  Therefore, there is no unified standard for a "better world". Talking about changing the world without starting from reality is empty, and technical production that is detached from real needs is redundant and misplaced.



                  Social imagination is not boundless and fanciful, but a creative way of thinking that is closely tied to reality yet not limited by immediate obstacles. And making a wish, is an open expression of this creative thinking.



                  In order to achieve the wish of building a better world, we need individuals from different backgrounds to voice their own imaginations in response to their environments. Each vision of a better society is unique, and no concrete wish raised from a specific reality can be expressed by others.



                  The Wishing Pool is a globally shared public domain that bears people's different imaginations of a better world, and serves as a platform for public expressions.

                  ##
                </p>
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Starting from Individuals and Communities
                </h1>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">


                  We live in an era where the world order is plunging into deeper chaos. International conflicts and wars occur frequently, the global political environment is constantly worsening, economic uncertainty brings more friction to international trade. The globalization that was supposed to be a human ideal for collaboration has shown such a fragile and broken reality today. Faced with these great conflicts, no solution can permanently quell our anxiety.


                  However, as independent individuals who love this world, even if we cannot shake those deep-rooted diseases on our own, we still have the ability to imagine a better society. This valuable ability to imagine can guide us to find like-minded people and work together to build a small environment that allows us to live comfortably.



                  **A better society should be composed of individuals and their communities as the smallest unit.** Whether it is the emergence of Bitcoin or the birth of the Network State narrative, it all originates from a call made by individuals in response to the reality. These social callings continuously attract more like-minded people to join, slowly forming its own communities. Over a long period of growth, they will eventually converge into a force that change the world.



                  Therefore, DO NOT succumb to a world that you don't agree with.



                  Do not give up your innate desire for a better life.



                  **Perceive your deepest desires, mobilize your most sincere imagination, and publicly articulate the reality you expect from this world. Make a wish.**



                  This wish can be very ambitious, even if as an individual you may not be able to achieve it. However, The Wishing Pool shared globally would allow people who support this wish to find each other and work together to negotiate specific ways to achieve it.



                  This wish can be very small, even if it may only be related to improving the community environment you are in. The Wishing Pool based on transparent on-chain infrastructure may help you gain support from nearby residents, making it more likely for your wish to come true.



                  **The Wishing Pool is a cyber public square for everyone to make wishes and receive their blessings and echos. It is a trigger to the social callings.**
                </p>
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  The Rise of Regional Public Goods
                </h1>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  When people start forming diverse communities based on different consensuses, some wishes proposed by the community as a whole will begin to emerge.
                  A wish proposed by the community has gone through an internal negotiation process and reached a certain consensus foundation. However, it may not necessarily be achievable through the coordination and allocation of community resources alone. Publicly expressing these wishes means that the community is requesting support from the external environment.
                  However, in reality, boundaries often exist between different communities due to differences in values. These boundaries can lead to a lack of communication and exchange channels, which hinders cross-community collaboration.
                  The Wishing Pool is a platform for everyone to openly express their wishes. It can bridge value differences between communities by focusing on understanding each other's expectations, finding common ground, and launching cross-community cooperation. This collaboration can refine and negotiate common needs of local communities, form collective solutions, gather more people's support, generate regional public goods, and promote larger-scale social changes.
                  **The Wishing Pool serves as platform that provides public space for diverse communities. It promotes the integration of various social imagination, breaks the boundaries between communities with common wishes, and will become a social support system that promotes regional resource coordination and distribution.**
                </p>
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  The Whole Earth Wish Catalog
                </h1>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  In 1968, Stewart Brand brought a global perspective to the world through "The Whole Earth Catalog". At a time when the internet did not yet exist, he inspired self-education and the creation of personally-approved environments by passing on information about available tools.
                  Today, with internet technology being widely available, access to tools and information is no longer a barrier for people to build a better world. However, people still lack a global perspective when it comes to their expectations for a better world. This global perspective does not imply a uniform worldview, but rather a dynamic map of expectations with significant regional differences due to cultural diversity.
                  The Wishing Pool is a globally shared platform for making wishes. It provides people with an overview of wishes from around the world, which not only deepens their understanding of social expectations worldwide, but also promotes cross-regional cooperation. This platform enables the realization of diverse wishes to create a better society.
                  This “Whole Earth Wish Catalog” also provides a map of the world for nomads who do not want to be constrained by factors like nationality, race, or geography. We can flow around the world to places where the wishes we want to achieve are happening and build a world with more choices together.
                  **The Wishing Pool serves as a starting point for us to share our imagination of society through wishing and to work together towards a better future.**
                </p>
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Worldwide Network to Support Your Wishes
                </h1>
                <p className="mb-12 text-base text-justify font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">

                  We believe that the new world of the future is driven by good wishes.
                  We believe that the public expression of good wishes is a social calling.
                  We believe that this calling can transcend language, geography, culture, and faith barriers, and become a global network that supports the fulfillment of wishes.
                  We look forward to this network becoming a public domain co-created by humanity, where everyone can unleash their creativity and imagination, and become a new social force that injects infinite possibilities into the future of humanity.
                  **The Wishing Pool is a public good for everyone.**
                  **Let us light up the future together with our wishes.**
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">

                  <button className="px-8 py-4 text-base font-semibold text-black duration-300 ease-in-out rounded-md bg-black/20 hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                    onClick={async (event) => {
                      event.preventDefault()
                      if (chain != undefined) {
                        if (chain.id != 5) {
                          switchNetwork(5)
                        } else {
                          // usePrepareContractWrite, useContractWrite .... so many hooks not working
                          // using ethers ...
                          const contractAddress = '0x42f034CD03E06087870cF0D662EA6dB389E3364f'; // replace with your contract address
                          const contractABI = YoruAbi // replace with your contract's ABI
                          const provider = new ethers.providers.Web3Provider(window.ethereum);
                          const signer = provider.getSigner();
                          const contract = new ethers.Contract(contractAddress, contractABI, signer);
                          const options = { value: ethers.utils.parseEther("0.1") }
                          const result = await contract.mint(options);
                          if (result) {
                            Power.find({ address: address }, function (err, docs) {
                              console.log('Power', docs);
                              if (docs.length > 0) {
                                let t = docs[0].power;
                                t = t + 100;
                                console.log('docs[0]._id', docs[0]._id)
                                Power.remove({ _id: docs[0]._id }, {}, function (err, numRemoved) {
                                  let aaa = { address: address, power: t }
                                  Power.insert(aaa, function (err, newDoc) {
                                    console.log(err)
                                    setPower(t);
                                    Power.find({}, function (err, ccc) {
                                      console.log('bbbb', ccc)
                                      setPowers(ccc);
                                    });
                                    // Do something with the newly inserted data
                                  });
                                });
                              } else {
                                let aaa = { address: address, power: 100 }
                                Power.insert(aaa, function (err, newDoc) {

                                  setPower(100);
                                  Power.find({}, function (err, ccc) {

                                    setPowers(ccc);
                                  });
                                  // Do something with the newly inserted data
                                });
                              }

                            });
                            console.log('mint success');
                          }

                        }

                      }
                    }}
                  >
                    Mint
                  </button>
                  <button className="px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out rounded-md bg-primary hover:bg-primary/80"
                    onClick={(event) => {
                      event.preventDefault()
                      const message = `
                      Why We Need the Wishing Pool?
                      In real life, a Wishing Pool is a place where people reflect on and express their inner hopes for the future. It transcends cultural and geographical barriers and exists widely in every corner of society where people have hopes for better social realities. Through ritualistic gestures, people entrust their wishes to gods or the universe. Alternatively, by sharing their wishes with those around them through sincere and imaginative public expressions in this symbolic public space, people create connections between individuals, and give blessings to each other.
                      Every wish, whether private or public, is a call from the individual to the desired reality in their heart. The Wishing Pool is where these diverse social calls converge. Based on physical space, the Wishing Pool can only convey these wishes to a limited extent. The process of making wishes come true depends more on the individual's efforts, or the favor of the gods.
                      In today's era of information technology, if we could link each other's wishes through the internet, and let these imaginative wishes for society be seen by each other, perhaps we could connect more people with similar expectations, and make some consensus wishes come true.
                      Building a globally shared Wishing Pool based on blockchain infrastructure is to make the social calls of this era visible to the public and to truly trigger them to become a certain reality.
                      Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world. ——Albert Einstein
                      `
                      signMessage({ message });

                    }}
                  >
                    Signature
                  </button>
                </div>
                <h1 className="pt-6">
                  {
                    (isConnected && powers.length > 0) ? <p>Wish Power:{power}</p> : 'Wish Power: 0'
                  }
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
      <section className="relative z-10 overflow-hidden  pb-16  md:pb-[120px]  xl:pb-[160px] 2xl:pb-[200px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div
              className="wow fadeInUp mx-auto max-w-[800px] text-center"
              data-wow-delay=".2s"
            >
              <h3 className="mb-4 text-xl font-bold">Sign List</h3>
              <div className="wow w-full fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" data-wow-delay=".15s ">
                <>
                  {
                    singusers.map((singuser) => (
                      <>
                        <h1 className="font-bold"> {singuser.date.toDateString()} </h1>
                        <br />
                        <h1> {singuser.address}</h1>
                      </>
                    ))
                  }
                </>
              </div>
              <div className="flex items-center justify-between w-full px-14">
                <div className="w-2/3 mb-8">
                  <input
                    type="text"
                    ref={wisthtextInput}
                    placeholder="Enter your Wishing"
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                  />
                </div>
                <div className="w-1/3 mb-8 ml-5">
                  <button className="px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out rounded-md bg-primary hover:bg-primary/80"
                    onClick={(event) => {
                      event.preventDefault()
                      console.log(wisthtextInput.current.value)
                      const wish = { wish: wisthtextInput.current.value, date: new Date() };

                      wishdb.find({ wish: wisthtextInput.current.value }, function (err, docs) {
                        if (docs.length == 0) {
                          wishdb.insert(wish, function (err, newDoc) {
                            console.log(err)
                            wishdb.find({}, function (err, ccc) {
                              setWishs(ccc);
                            });
                            // Do something with the newly inserted data
                          });
                        }
                      });
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Wish List
              </h1>
              <div className="wow w-full fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" data-wow-delay=".15s ">
                <>
                  {
                    wishs.map((wish) => (
                      <>
                        <div className="flex items-center justify-between w-full">
                          <div className="w-1/2 mb-8">
                            <h2> {wish.wish} </h2>
                          </div>
                          <div className="w-1/2 mb-8 ml-5">
                            <button className="px-8 py-4 text-xs font-semibold text-white duration-300 ease-in-out rounded-md bg-primary hover:bg-primary/80"
                              onClick={(event) => {
                                Power.find({ address: address }, function (err, docs) {
                                  console.log('Power', docs);
                                  if (docs.length > 0) {
                                    let t = docs[0].power;
                                    t = t - 10;
                                    console.log('docs[0]._id', docs[0]._id)
                                    Power.remove({ _id: docs[0]._id }, {}, function (err, numRemoved) {
                                      let aaa = { address: address, power: t }
                                      Power.insert(aaa, function (err, newDoc) {
                                        console.log(err)
                                        setPower(t);
                                        Power.find({}, function (err, ccc) {
                                          console.log('bbbb', ccc)
                                          setPowers(ccc);
                                        });
                                        // Do something with the newly inserted data
                                      });

                                    });
                                  }
                                })
                              }}
                            >
                              Bless  Use < br /> Wish Power
                            </button>
                          </div>
                        </div >
                      </>
                    ))
                  }
                </>
              </div>
            </div>
          </div>
        </div>

      </section >
    </>
  );
};

export default Hero;
