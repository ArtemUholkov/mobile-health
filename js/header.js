const burger = document.querySelector('#burger');
const popup = document.querySelector('#popup');
const popupSlide = document.querySelector('#popupSlide');
const sliderItem = document.querySelectorAll('.our_requirements_content_item');
const sliderPhoto = document.querySelector('.our_requirements_img');
const body = document.body;
const casualLogo = document.querySelector('.logo-white');
const colorLogo = document.querySelector('.logo-color');

burger.addEventListener('click', burgerHandler);
popup.addEventListener('click', (e) => {
  burgerHandler(e);
});

sliderItem.forEach((e) => {
  e.addEventListener('click', () => {
    setImage(e, sliderItem);
  });
});

function burgerHandler(e) {
  if (popup.classList.contains('open')) {
    popup.classList.add('close');
    body.classList.remove('noscroll');
    popupSlide.classList.add('slideout');
    casualLogo.classList.remove('logo-hide');
    colorLogo.classList.add('logo-hide');
    setTimeout(() => {
      casualLogo.classList.remove('logo-hide');
      colorLogo.classList.add('logo-hide');
      // colorLogo.classList.remove('logo-hide');
      // casualLogo.classList.add('logo-hide');
    }, 270);
    setTimeout(() => {
      popup.classList.remove('close');
      popup.classList.remove('open');
      popupSlide.classList.remove('slideout');
      popupSlide.classList.remove('slidein');
    }, 270);
  } else {
    body.classList.add('noscroll');
    popup.classList.add('open');
    popupSlide.classList.add('slidein');
    setTimeout(() => {
      //   casualLogo.classList.remove('logo-hide');
      // colorLogo.classList.add('logo-hide');
      colorLogo.classList.remove('logo-hide');
      casualLogo.classList.add('logo-hide');
    }, 270);
  }
  burger.classList.toggle('active');
}

const bottles = document.querySelectorAll('.invest_bottle');
const bottlesContainer = document.querySelector('.invest_bottles');
const productsContainer = document.querySelector('.products');

bottles.forEach((bottle) => {
  bottle.addEventListener('click', () => {
    // Check if the clicked bottle is already active
    const isAlreadyClicked = bottle.classList.contains('clicked');

    // Remove clicked class from all bottles
    bottles.forEach((b) => {
      b.classList.remove('clicked');
    });

    // Remove all bottle-specific classes from products container
    productsContainer.classList.remove(
      'bottle1-active',
      'bottle2-active',
      'bottle3-active',
      'bottle4-active',
      'has-active-content',
    );

    // If the bottle wasn't already clicked, activate it
    if (!isAlreadyClicked) {
      bottle.classList.add('clicked');

      // Add specific class based on which bottle was clicked
      if (bottle.classList.contains('bottle1')) {
        productsContainer.classList.add('bottle1-active', 'has-active-content');
      } else if (bottle.classList.contains('bottle2')) {
        productsContainer.classList.add('bottle2-active', 'has-active-content');
      } else if (bottle.classList.contains('bottle3')) {
        productsContainer.classList.add('bottle3-active', 'has-active-content');
      } else if (bottle.classList.contains('bottle4')) {
        productsContainer.classList.add('bottle4-active', 'has-active-content');
      }
    }

    // Update container class based on whether any bottle is active
    const hasActiveBottle = document.querySelector('.invest_bottle.clicked');
    if (hasActiveBottle) {
      bottlesContainer.classList.add('has-active');
    } else {
      bottlesContainer.classList.remove('has-active');
    }
  });
});

// Therapies section interactive functionality
const therapyItems = document.querySelectorAll('.ther_item');
const therapyWrapper = document.querySelector('.ther_items-wrapper');

therapyItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Only allow expansion for items 1, 2, 3 (index 0, 1, 2)
    if (index < 3) {
      // Check if this item is already expanded
      const isAlreadyExpanded = item.classList.contains('expanded');

      // Remove expanded class from all items
      therapyItems.forEach((therapyItem) => {
        therapyItem.classList.remove('expanded');
      });

      // Remove fly-away class from all items
      therapyItems.forEach((therapyItem) => {
        therapyItem.classList.remove('fly-away');
      });

      // Remove has-expanded class from wrapper
      therapyWrapper.classList.remove('has-expanded');

      // If the item wasn't already expanded, expand it
      if (!isAlreadyExpanded) {
        item.classList.add('expanded');
        therapyWrapper.classList.add('has-expanded');

        // Make the left item (index 3) fly away
        if (therapyItems[3]) {
          therapyItems[3].classList.add('fly-away');
        }
      }
    }
  });
});
