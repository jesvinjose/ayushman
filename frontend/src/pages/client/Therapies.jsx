import React from "react";
import greenLeaves from "../../assets/images/png/leaf.webp";
import abhyangam from "../../assets/images/png/abhyangam-preview.webp";
import panchakarma from "../../assets/images/png/panchakarma-preview.webp";
import shirodhara from "../../assets/images/png/shirodhara-preview.webp";
import beautyTherapy from "../../assets/images/png/beauty-therapy-preview.webp";
import pizhichil from "../../assets/images/png/pizhichil-preview.webp";
import njavaraKizhi from "../../assets/images/png/njavara-kizhi-preview.webp";
import nasyam from "../../assets/images/png/nasyam-preview.webp";
import katiVasti from "../../assets/images/png/kati-vasti-preview.webp";
import netraTarpana from "../../assets/images/png/netra-tarpana-preview.webp";
import udvarthanam from "../../assets/images/png/udwarthanam-preview.webp";
import pichu from "../../assets/images/png/picchu-preview.webp";

function Therapies() {
  return (
    <div className="treatments-bg bg-gray-100">
      <div className="treatments-head-wrapper max-w-[1380px] border mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="treatments-head-container mb-8 flex justify-center items-center text-center"
          style={{
            backgroundImage: `url(${greenLeaves})`,
            backgroundSize: "auto 100%",
            padding: "20px",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Treatments
          </h1>
        </div>
        <div className="visiting-consultants-container">
          <p class="text-center text-lg md:text-xl lg:text-2xl">
            We offer a wide range of specially curated treatments that
            revitalize your body, mind, and spirit.
          </p>
          <ul class="treatment-card-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={panchakarma}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Panchakarma</h6>
                  <p class="text-gray-700 mt-2">
                    This five-fold purification therapy aims at correcting the
                    imbalance of the doshas - Vata, Pitta, Kapha in order to
                    maintain their inherent equilibrium.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={abhyangam}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Abhyangam</h6>
                  <p class="text-gray-700 mt-2">
                    This stimulating treatment with complete body oil
                    application increases blood circulation and revitalizes the
                    body.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={shirodhara}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Shirodhara</h6>
                  <p class="text-gray-700 mt-2">
                    This one of a kind therapy induces a relaxed state by
                    dripping medicated oil on the forehead to soothe the body as
                    well as the mind.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={beautyTherapy}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Beauty Therapy</h6>
                  <p class="text-gray-700 mt-2">
                    Ayurvedic beauty therapy follows the ancient methods of
                    beauty enhancement. It rejuvenates the skin and brings about
                    a healthy glow.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={pizhichil}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Pizhichil</h6>
                  <p class="text-gray-700 mt-2">
                    This oil-based therapy enhances blood circulation while
                    providing relief from skeletal & muscular diseases.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={njavaraKizhi}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Njavara Kizhi</h6>
                  <p class="text-gray-700 mt-2">
                    This massage therapy nourishes and rejuvenates the body and
                    boosts the immune system.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={nasyam}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Nasyam</h6>
                  <p class="text-gray-700 mt-2">
                    This distinct treatment involves the administration of
                    medicated oils through the nose to stimulate the brain
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={katiVasti}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Kati Vasti</h6>
                  <p class="text-gray-700 mt-2">
                    This therapy is intended to alleviate lower back conditions
                    and lubricate the joints for a pain-free life.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={netraTarpana}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Netra Tarpana</h6>
                  <p class="text-gray-700 mt-2">
                    This revitalising treatment aims at providing cooling and
                    rejuvenation to the eye to heal from diseases & bring
                    clarity to the vision.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={udvarthanam}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Udvarthanam</h6>
                  <p class="text-gray-700 mt-2">
                    This stimulating massage is helpful in weight reduction and
                    relieves body pain.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={katiVasti}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Elakizhi</h6>
                  <p class="text-gray-700 mt-2">
                    This sweat-inducing treatment makes use of numerous
                    medicinal herbs to eliminate waste from the body
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span class="block mb-4">
                  <img
                    class="w-full h-40 object-cover rounded-lg"
                    src={pichu}
                    alt=""
                  />
                </span>
                <div class="treatment-card-content">
                  <h6 class="text-xl font-semibold">Pichu</h6>
                  <p class="text-gray-700 mt-2">
                    This ancient therapy alleviates pain with the application of
                    warm, medicated oil-soaked cotton pads.
                  </p>
                  <div class="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      class="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* <!-- Repeat the same structure for other treatments --> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Therapies;
