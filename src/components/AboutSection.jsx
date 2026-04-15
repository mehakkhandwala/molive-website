export default function AboutSection() {
  return (
    <section id="about" style={{ width: '100%' }}>

      {/* Hero — solid dark olive */}
      <div className="about-hero-bar">
        <h2 className="about-hero-bar-title">Our Story</h2>
        <p className="about-hero-bar-sub">Made with love, olive oil, and a little bit of magic.</p>
      </div>

      {/* Story — centered single column */}
      <div className="about-story-section">
        <div className="about-story-text">
          <span className="about-eyebrow">Molive</span>
          <p className="about-body-p">M + olive. We make one thing: olive oil cake.</p>
          <p className="about-body-p">
            Soft, golden, and purposefully not-too-sweet. The kind you return to with coffee,
            again and again. Rooted in memory, but made for right now.
          </p>
          <p className="about-body-p about-body-p--italic">
            (Moe-live? Mah-live? Either way, it pairs well with coffee.)
          </p>
          <p className="about-body-p about-body-p--signoff">Enjoy every crumb.</p>
        </div>
      </div>

      {/* Wave */}
      <div className="about-wave-top" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path fill="#7a8a4a" d="M0,32 C320,64 800,0 1440,40 L1440,64 L0,64 Z"/>
        </svg>
      </div>

      {/* Trilogy — three columns */}
      <div className="about-trilogy">
        <div className="about-trilogy-grid">

          {/* Col 1 — The M */}
          <div className="about-trilogy-col about-trilogy-col--center">
            <span className="about-t-eyebrow">The M</span>
            <div className="about-t-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="123 70 610 610" aria-label="Mariam's signature">
                <path fill="#ffffff" d="M 524.71875 613.972656 C 516.910156 621.570312 509.652344 623.753906 504.027344 620.179688 C 499.910156 617.566406 496.242188 605.734375 492.78125 583.9375 C 489.886719 565.675781 489.394531 550.855469 489.453125 485.328125 C 489.507812 438.023438 490.429688 399.5625 491.859375 385.851562 C 493.136719 373.550781 493.742188 363.054688 493.214844 362.511719 C 492.667969 361.984375 482.285156 364.183594 470.117188 367.417969 C 409.21875 383.574219 377.433594 384.347656 333.648438 370.691406 L 318.996094 366.140625 L 307.84375 383.519531 C 301.710938 393.074219 290.765625 409.679688 283.523438 420.4375 C 276.28125 431.179688 270.640625 440.242188 270.976562 440.582031 C 271.316406 440.921875 276.09375 440.242188 281.605469 439.058594 C 287.097656 437.875 297.855469 437.308594 305.511719 437.800781 C 317 438.550781 320.761719 439.660156 327.253906 444.230469 C 338.460938 452.09375 347.976562 466.78125 354.203125 485.796875 C 359.019531 500.484375 359.601562 504.867188 359.601562 526.703125 C 359.601562 556.984375 355.59375 569.832031 341.753906 584.050781 C 328.230469 597.929688 319.316406 601.859375 301.257812 601.898438 C 287.339844 601.9375 285.402344 601.449219 276.414062 595.671875 C 264.695312 588.148438 256.121094 575.886719 254.351562 564.152344 C 252.601562 552.527344 254.351562 551.625 258.753906 561.894531 C 266.710938 580.457031 281.867188 591.515625 299.417969 591.515625 C 316.871094 591.515625 332.066406 580.496094 340.304688 561.875 C 343.503906 554.652344 343.878906 550.214844 343.277344 526.988281 C 342.597656 501.050781 342.410156 500.015625 335.902344 486.230469 C 323.828125 460.6875 310.210938 450.511719 291.855469 453.257812 C 279.648438 455.082031 255.554688 467.984375 241.636719 480.117188 C 224.035156 495.484375 222.058594 496.59375 216.585938 494.089844 C 208.667969 490.480469 210.886719 484.800781 228.078125 464.636719 C 236.898438 454.292969 249.855469 437.308594 256.890625 426.890625 C 270.941406 406.070312 296.746094 356.660156 303.273438 338.078125 C 307.953125 324.78125 312.394531 318.875 317.699219 318.875 C 324.675781 318.875 328.492188 322.730469 331.410156 332.757812 C 334.871094 344.679688 338.96875 348.894531 353.960938 355.910156 C 364.847656 361.003906 366.296875 361.195312 395.335938 361.195312 C 417.058594 361.195312 429.867188 360.253906 441.417969 357.828125 C 464.25 353.011719 493.175781 343.851562 495.902344 340.582031 C 497.183594 339.039062 499.382812 329.933594 500.832031 320.34375 C 504.535156 295.480469 508.429688 276.578125 516.085938 246.464844 C 532.351562 182.386719 551.40625 145.75 573.898438 135.253906 C 589.945312 127.785156 603.65625 130.289062 618.097656 143.285156 C 633.558594 157.183594 640.78125 178.625 640.78125 210.597656 C 640.78125 244.566406 630.285156 269.316406 605.273438 294.273438 C 587.835938 311.671875 573.28125 322.015625 544.410156 337.535156 C 517.042969 352.261719 519.167969 348.894531 514.730469 384.703125 C 508.015625 438.910156 504.816406 558.789062 509.292969 588.414062 C 512.472656 609.496094 515.519531 612.488281 528.875 607.636719 C 531.167969 606.808594 529.53125 609.289062 524.71875 613.972656 Z M 524.171875 323.804688 C 524.171875 329.652344 527.164062 329.011719 544.859375 319.308594 C 582.851562 298.527344 610.40625 270.726562 619.941406 243.570312 C 630.53125 213.4375 624.4375 174.109375 606.703125 158.085938 C 582.195312 135.949219 559.230469 169.257812 536.640625 259.628906 C 530.960938 282.386719 524.171875 317.296875 524.171875 323.804688 Z M 575.519531 541.46875 C 568.390625 545.136719 563.386719 545.417969 560.28125 542.316406 C 555.84375 537.875 558.214844 534.921875 570.664062 529.335938 C 577.605469 526.214844 590.753906 519.371094 599.875 514.101562 C 608.976562 508.855469 617.046875 505.167969 617.796875 505.941406 C 619.960938 508.160156 587.914062 535.09375 575.519531 541.46875 Z"/>
              </svg>
            </div>
            <h3 className="about-t-heading">Somehow, one olive oil cake became all of this.</h3>
            <p className="about-t-body">The M in Molive is my grandmother's signature.</p>
          </div>

          {/* Col 2 — The Mustapha Project */}
          <div className="about-trilogy-col about-trilogy-col--center">
            <span className="about-t-eyebrow">The Mustapha Project</span>
            <h3 className="about-t-heading">Molive is the first chapter.</h3>
            <p className="about-t-body">
              The Mustapha Project is a creative studio I'm building around language, roots, and form.
            </p>
            <p className="about-t-body">
              When not in the kitchen, I'm deep in its next exploration: <em>When Letters Speak</em>,
              a visual journey through Arabic calligraphy found in nature.
            </p>
            <span className="about-t-more">More on that soon.</span>
          </div>

          {/* Col 3 — Quote */}
          <div className="about-trilogy-col about-trilogy-col--quote">
            <p className="about-t-quote">
              Think: mountains, letters, and somehow still cake.
            </p>
            <hr className="about-t-quote-rule" />
          </div>

        </div>
      </div>

    </section>
  )
}
