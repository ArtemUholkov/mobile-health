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

// Typewriter animation function
function typewriterEffect(element, text, speed = 50) {
  // Use inline display for spans (therapies section)
  element.style.display = 'inline';
  element.textContent = '';
  element.style.borderRight = 'none';

  // Prevent multiple intervals on the same element
  if (element._typewriterTimer) {
    clearInterval(element._typewriterTimer);
  }

  let i = 0;
  element._typewriterTimer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(element._typewriterTimer);
      element._typewriterTimer = null;
      element.style.borderRight = 'none';
      element.style.whiteSpace = 'normal';
      element.style.wordWrap = 'break-word';
    }
  }, speed);
}

// Function to reset span text to original state
function resetSpanText(element) {
  const originalText = element.getAttribute('data-original-text');
  if (originalText) {
    element.textContent = originalText;
  }
  element.style.display = 'none';
  element.style.borderRight = 'none';
  element.style.whiteSpace = 'normal';
  element.style.wordWrap = 'break-word';
}

therapyItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Allow expansion for items 1, 2, 3, 4 (index 0, 1, 2, 3)
    if (index < 4) {
      // Check if this item is already expanded
      const isAlreadyExpanded = item.classList.contains('expanded');

      // Check if any item is currently expanded
      const hasAnyExpanded =
        therapyWrapper.classList.contains('has-expanded') ||
        therapyWrapper.classList.contains('has-expanded-fourth');

      // Check screen width for responsive behavior
      const isLargeScreen = window.innerWidth > 1600;

      // If the item wasn't already expanded, expand it
      if (!isAlreadyExpanded) {
        // If another item is expanded, collapse it first and then expand the clicked item
        if (hasAnyExpanded) {
          // Find the currently expanded item and collapse it
          const expandedItem = Array.from(therapyItems).find((item) =>
            item.classList.contains('expanded'),
          );
          if (expandedItem) {
            // Reset typewriter text for all spans in the previously expanded item
            expandedItem.querySelectorAll('.ther_item-textitem span').forEach((span) => {
              resetSpanText(span);
            });
            // Change "Read Less" back to "Read more"
            const readMoreText = expandedItem.querySelector('.ther_readmore');
            if (readMoreText) readMoreText.textContent = 'Read more';
            expandedItem.classList.remove('expanded');
          }

          // Only apply flying away logic on large screens
          if (isLargeScreen) {
            // Add collapsing class to reset gap immediately but keep flex alignment
            therapyWrapper.classList.add('collapsing');

            // Remove fly-away and slide-left classes from all items after delay
            setTimeout(() => {
              therapyItems.forEach((therapyItem) => {
                therapyItem.classList.remove(
                  'fly-away',
                  'fly-away-left',
                  'fly-away-right',
                  'slide-left',
                );
              });
            }, 600); // 600ms delay - longer than the expansion delay

            // After all closing animations complete, expand the clicked item
            setTimeout(() => {
              therapyWrapper.classList.remove('has-expanded', 'has-expanded-fourth', 'collapsing');
              item.classList.add('expanded');

              // Typewriter effect for all spans in the expanded item
              item.querySelectorAll('.ther_item-textitem span').forEach((span) => {
                const text = span.getAttribute('data-original-text');
                if (text) typewriterEffect(span, text, 13);
              });
              // Change "Read more" to "Read Less"
              const readMoreText = item.querySelector('.ther_readmore');
              if (readMoreText) readMoreText.textContent = 'Read less';

              // Make the appropriate item fly away based on which item is expanding
              if (index < 3) {
                // If expanding items 1, 2, 3, make item 4 fly away to the right
                if (therapyItems[3]) {
                  therapyItems[3].classList.add('fly-away-right');
                }
              } else {
                // If expanding item 4, make item 1 fly away to the left
                if (therapyItems[0]) {
                  therapyItems[0].classList.add('fly-away-left');
                }
                // Make remaining items slide left to fill the space
                if (therapyItems[1]) {
                  therapyItems[1].classList.add('slide-left');
                }
                if (therapyItems[2]) {
                  therapyItems[2].classList.add('slide-left');
                }
                if (therapyItems[3]) {
                  therapyItems[3].classList.add('slide-left');
                }
              }

              // Add appropriate wrapper class based on which item is expanding
              if (index < 3) {
                therapyWrapper.classList.add('has-expanded');
              } else {
                therapyWrapper.classList.add('has-expanded-fourth');
              }
            }, 800); // 800ms delay - after fly-away items return
          } else {
            // Simple expand for small screens
            item.classList.add('expanded');

            // Typewriter effect for all spans in the expanded item
            item.querySelectorAll('.ther_item-textitem span').forEach((span) => {
              const text = span.getAttribute('data-original-text');
              if (text) typewriterEffect(span, text, 13);
            });
            // Change "Read more" to "Read Less"
            const readMoreText = item.querySelector('.ther_readmore');
            if (readMoreText) readMoreText.textContent = 'Read less';
          }

          return;
        }
        // Remove expanded class from all items
        therapyItems.forEach((therapyItem) => {
          // Reset typewriter text for all spans
          therapyItem.querySelectorAll('.ther_item-textitem span').forEach((span) => {
            resetSpanText(span);
          });
          // Change "Read Less" back to "Read more"
          const readMoreText = therapyItem.querySelector('.ther_readmore');
          if (readMoreText) readMoreText.textContent = 'Read more';
          therapyItem.classList.remove('expanded');
        });

        // Only apply flying away logic on large screens
        if (isLargeScreen) {
          // Remove has-expanded classes from wrapper
          therapyWrapper.classList.remove('has-expanded', 'has-expanded-fourth');

          // Remove fly-away and slide-left classes from all items
          therapyItems.forEach((therapyItem) => {
            therapyItem.classList.remove(
              'fly-away',
              'fly-away-left',
              'fly-away-right',
              'slide-left',
            );
          });

          // Only remove fly-away if we're coming from a collapsed state (no items were expanded)
          if (!hasAnyExpanded) {
            // Check if any item actually has fly-away class before removing it
            const hasFlyAway = Array.from(therapyItems).some(
              (item) =>
                item.classList.contains('fly-away') ||
                item.classList.contains('fly-away-left') ||
                item.classList.contains('fly-away-right'),
            );
            if (hasFlyAway) {
              // Remove fly-away classes from all items
              therapyItems.forEach((therapyItem) => {
                therapyItem.classList.remove('fly-away', 'fly-away-left', 'fly-away-right');
              });

              // Add delay before expanding
              setTimeout(() => {
                item.classList.add('expanded');

                // Typewriter effect for all spans in the expanded item
                item.querySelectorAll('.ther_item-textitem span').forEach((span) => {
                  const text = span.getAttribute('data-original-text');
                  if (text) typewriterEffect(span, text, 13);
                });
                // Change "Read more" to "Read Less"
                const readMoreText = item.querySelector('.ther_readmore');
                if (readMoreText) readMoreText.textContent = 'Read Less';

                // Make the appropriate item fly away based on which item is expanding
                if (index < 3) {
                  // If expanding items 1, 2, 3, make item 4 fly away to the right
                  if (therapyItems[3]) {
                    therapyItems[3].classList.add('fly-away-right');
                  }
                } else {
                  // If expanding item 4, make item 1 fly away to the left
                  if (therapyItems[0]) {
                    therapyItems[0].classList.add('fly-away-left');
                  }

                  // Make remaining items slide left to fill the space
                  if (therapyItems[1]) {
                    therapyItems[1].classList.add('slide-left');
                  }
                  if (therapyItems[2]) {
                    therapyItems[2].classList.add('slide-left');
                  }
                  if (therapyItems[3]) {
                    therapyItems[3].classList.add('slide-left');
                  }
                }

                // Add flex alignment immediately for first expansion
                if (index < 3) {
                  therapyWrapper.classList.add('has-expanded');
                } else {
                  therapyWrapper.classList.add('has-expanded-fourth');
                }
              }, 300); // 300ms delay
            } else {
              // No fly-away class to remove, expand immediately
              item.classList.add('expanded');

              // Typewriter effect for all spans in the expanded item
              item.querySelectorAll('.ther_item-textitem span').forEach((span) => {
                const text = span.getAttribute('data-original-text');
                if (text) typewriterEffect(span, text, 13);
              });
              // Change "Read more" to "Read Less"
              const readMoreText = item.querySelector('.ther_readmore');
              if (readMoreText) readMoreText.textContent = 'Read Less';

              // Make the appropriate item fly away based on which item is expanding
              if (index < 3) {
                // If expanding items 1, 2, 3, make item 4 fly away to the right
                if (therapyItems[3]) {
                  therapyItems[3].classList.add('fly-away-right');
                }
              } else {
                // If expanding item 4, make item 1 fly away to the left
                if (therapyItems[0]) {
                  therapyItems[0].classList.add('fly-away-left');
                }

                // Make remaining items slide left to fill the space
                if (therapyItems[1]) {
                  therapyItems[1].classList.add('slide-left');
                }
                if (therapyItems[2]) {
                  therapyItems[2].classList.add('slide-left');
                }
                if (therapyItems[3]) {
                  therapyItems[3].classList.add('slide-left');
                }
              }

              // Add flex alignment immediately for first expansion
              if (index < 3) {
                therapyWrapper.classList.add('has-expanded');
              } else {
                therapyWrapper.classList.add('has-expanded-fourth');
              }
            }
          } else {
            // If switching between expanded items, need sequential animation

            // Check if we're switching from 4th item to items 1, 2, or 3
            const isFromFourthToLeft =
              therapyWrapper.classList.contains('has-expanded-fourth') && index < 3;

            if (isFromFourthToLeft) {
              // Step 1: Collapse the 4th item immediately
              therapyItems[3].classList.remove('expanded');
              therapyItems[3].querySelectorAll('.ther_item-textitem span').forEach((span) => {
                resetSpanText(span);
              });
              // Change "Read Less" back to "Read more"
              const readMoreText = therapyItems[3].querySelector('.ther_readmore');
              if (readMoreText) readMoreText.textContent = 'Read more';

              // Step 2: After delay, bring back the 1st item and remove slide classes
              setTimeout(() => {
                // Remove fly-away and slide classes
                therapyItems.forEach((therapyItem) => {
                  therapyItem.classList.remove(
                    'fly-away',
                    'fly-away-left',
                    'fly-away-right',
                    'slide-left',
                  );
                });

                // Step 3: After another delay, expand the clicked item
                setTimeout(() => {
                  item.classList.add('expanded');

                  // Typewriter effect for all spans in the expanded item
                  item.querySelectorAll('.ther_item-textitem span').forEach((span) => {
                    const text = span.getAttribute('data-original-text');
                    if (text) typewriterEffect(span, text, 13);
                  });
                  // Change "Read more" to "Read Less"
                  const readMoreText = item.querySelector('.ther_readmore');
                  if (readMoreText) readMoreText.textContent = 'Read less';

                  // Make the 4th item fly away to the right
                  if (therapyItems[3]) {
                    therapyItems[3].classList.add('fly-away-right');
                  }

                  // Add flex-start class
                  therapyWrapper.classList.add('has-expanded');
                }, 300); // 300ms delay before expanding new item
              }, 400); // 400ms delay before bringing back flying items
            } else {
              // Regular switching between items (not from 4th to left items)
              item.classList.add('expanded');

              // Typewriter effect for all spans in the expanded item
              item.querySelectorAll('.ther_item-textitem span').forEach((span) => {
                const text = span.getAttribute('data-original-text');
                if (text) typewriterEffect(span, text, 13);
              });
              // Change "Read more" to "Read Less"
              const readMoreText = item.querySelector('.ther_readmore');
              if (readMoreText) readMoreText.textContent = 'Read less';

              // Make the appropriate item fly away based on which item is expanding
              if (index < 3) {
                // If expanding items 1, 2, 3, make item 4 fly away to the right
                if (therapyItems[3]) {
                  therapyItems[3].classList.add('fly-away-right');
                }
              } else {
                // If expanding item 4, make item 1 fly away to the left
                if (therapyItems[0]) {
                  therapyItems[0].classList.add('fly-away-left');
                }

                // Make remaining items slide left to fill the space
                if (therapyItems[1]) {
                  therapyItems[1].classList.add('slide-left');
                }
                if (therapyItems[2]) {
                  therapyItems[2].classList.add('slide-left');
                }
                if (therapyItems[3]) {
                  therapyItems[3].classList.add('slide-left');
                }
              }

              // Add delay before changing flex alignment when switching
              setTimeout(() => {
                // Add appropriate wrapper class based on which item is expanding
                if (index < 3) {
                  therapyWrapper.classList.add('has-expanded');
                } else {
                  therapyWrapper.classList.add('has-expanded-fourth');
                }
              }, 200); // 200ms delay when switching between items
            }
          }
        } else {
          // Simple expand for small screens
          item.classList.add('expanded');

          // Typewriter effect for all spans in the expanded item
          item.querySelectorAll('.ther_item-textitem span').forEach((span) => {
            const text = span.getAttribute('data-original-text');
            if (text) typewriterEffect(span, text, 13);
          });
          // Change "Read more" to "Read Less"
          const readMoreText = item.querySelector('.ther_readmore');
          if (readMoreText) readMoreText.textContent = 'Read less';
        }
      } else {
        // If already expanded, collapse immediately
        // Remove expanded class from all items
        therapyItems.forEach((therapyItem) => {
          // Reset typewriter text for all spans
          therapyItem.querySelectorAll('.ther_item-textitem span').forEach((span) => {
            resetSpanText(span);
          });
          // Change "Read Less" back to "Read more"
          const readMoreText = therapyItem.querySelector('.ther_readmore');
          if (readMoreText) readMoreText.textContent = 'Read more';
          therapyItem.classList.remove('expanded');
        });

        // Only apply flying away logic on large screens
        if (isLargeScreen) {
          // Add collapsing class to reset gap immediately but keep flex alignment
          therapyWrapper.classList.add('collapsing');

          // Remove fly-away and slide-left classes from all items after delay
          setTimeout(() => {
            therapyItems.forEach((therapyItem) => {
              therapyItem.classList.remove(
                'fly-away',
                'fly-away-left',
                'fly-away-right',
                'slide-left',
              );
            });
          }, 600); // 600ms delay - longer than the expansion delay

          // Remove all layout classes after all animations complete
          setTimeout(() => {
            therapyWrapper.classList.remove('has-expanded', 'has-expanded-fourth', 'collapsing');
          }, 800); // 800ms delay - after fly-away items return
        }
      }
    }
  });
});

// How it Works section interactive functionality
const hiwItems = document.querySelectorAll('.hiw-item');

hiwItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Check if this item is already expanded
    const isAlreadyExpanded = item.classList.contains('opened');

    // If the item wasn't already expanded, expand it
    if (!isAlreadyExpanded) {
      // Collapse all other items first
      hiwItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('opened');
          // Hide the text and reset any typewriter text
          const textElement = otherItem.querySelector('.hiw_text');
          if (textElement) {
            textElement.style.display = 'none';
            textElement.textContent =
              textElement.getAttribute('data-original-text') || textElement.textContent;
          }
        }
      });

      // Expand the clicked item
      item.classList.add('opened');

      // Instantly show the text (no typewriter)
      const textElement = item.querySelector('.hiw_text');
      if (textElement) {
        const originalText =
          textElement.getAttribute('data-original-text') || textElement.textContent;
        textElement.setAttribute('data-original-text', originalText);
        textElement.textContent = originalText;
        textElement.style.display = 'block';
      }
    } else {
      // If already expanded, collapse it
      item.classList.remove('opened');
      // Hide the text and reset it
      const textElement = item.querySelector('.hiw_text');
      if (textElement) {
        textElement.style.display = 'none';
        const originalText = textElement.getAttribute('data-original-text');
        if (originalText) {
          textElement.textContent = originalText;
        }
      }
    }
  });
});

// FAQ plus/minus SVGs
const faqPlusSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.79126 0.692871V12.6929" stroke="#D46381" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.79126 6.69287H12.7913" stroke="#D46381" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const faqMinusSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none"><path d="M1.13623 1.15466H12.4462" stroke="white" stroke-width="1.46225" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

document.addEventListener('DOMContentLoaded', function () {
  // FAQ accordion logic
  const faqItems = document.querySelectorAll('.faq_item');
  faqItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      // Accordion: close others
      faqItems.forEach((i) => {
        if (i !== item) i.classList.remove('active');
      });
      // Toggle this one
      item.classList.toggle('active');
      // Update plus/minus icon for all
      faqItems.forEach((faq) => {
        const icon = faq.querySelector('.plus-minus');
        if (icon) {
          if (faq.classList.contains('active')) {
            icon.innerHTML = faqMinusSVG;
            icon.style.background = '#9b3d57';
          } else {
            icon.innerHTML = faqPlusSVG;
            icon.style.background = '';
          }
        }
      });
    });
    // Set initial icon
    const icon = item.querySelector('.plus-minus');
    if (icon) {
      icon.innerHTML = faqPlusSVG;
    }
  });
});
