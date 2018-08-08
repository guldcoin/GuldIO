jQuery(function ($) {
    'use strict';
    // --------------------------------------------------------------------
    // jQuery One Page Scrolling & Link Handling
    // --------------------------------------------------------------------
		// Select all links with hashes
		$('a[href*=\\#]:not([href=\\#])').on('click', function(){
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
		        || location.hostname == this.hostname) {
		        var target = $(this.hash);
		        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		           if (target.length) {
		             $('html,body').animate({
		                 scrollTop: target.offset().top - 20 //scroll position fix
		            }, 737);
		            return false;
		        }
		    }
		});
				
		// Open all external links in new window 
		$('a').filter(function () {return this.hostname != window.location.hostname;}).attr('target', '_blank');
		
		// No event for empty links
		$('a[href=\\#]').on('click', function(){return false;});
			
    // --------------------------------------------------------------------
    // Closes the Responsive Menu on Menu Item Click
    // --------------------------------------------------------------------
		$('.navbar-nav>li>a,nav a').on('click', function(){
			$('.navbar-collapse').collapse('hide');
		});

}); // JQuery end

// Banner Messages
'use strict';
function BannerMessages(options) {
    this.messages = options.messages;
    this.target = '.' + options.target;
    this.messageClass = 'site-message';
    this.messageTarget = '.' + this.messageClass;

    this.cacheName = 'guld_messages';
    this.dataTarget = 'messageid';

    this.getCache = function (key) {
        return JSON.parse(window.localStorage.getItem(key));
    };

    this.setCache = function (key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    };

    this.clearCache = function (key) {
        window.localStorage.removeItem(key);
    };

    this.cache = this.getCache(this.cacheName);

    this.updateCache = function (messageArr, cacheArr) {
        if (messageArr.length > 0) {
            var updateClosure = function updateClosure(self, closureCache) {
                function updateForEach(value) {
                    var cacheFilter = closureCache.filter(function (c) {
                        return c.id === value.id;
                    });

                    if (cacheFilter.length > 0) {
                        var cache = cacheFilter[0];

                        var messageUpdate = new Date(value.timeUpdated);
                        var cacheTime = new Date(cache.timeCached);

                        if (messageUpdate >= cacheTime) {
                            self.updateCacheItem(value);
                            return value;
                        } else {
                            return cache;
                        }
                    }
                }

                return updateForEach;
            };

            if (cacheArr == null) {
                this.setCache(this.cacheName, messageArr.map(function (value) {
                    value.timeCached = new Date().getTime();
                    return value;
                }));
                this.updateMessageDom(messageArr);
                return;
            }

            var updatedMessages = messageArr.map(updateClosure(this, cacheArr));

            this.setCache(this.cacheName, updatedMessages);
            this.updateMessageDom(updatedMessages);
        } else {
            if (cacheArr != null) {
                this.clearCache(this.cacheName);
            }
        }
    };

    this.updateCacheItem = function (itemToCache) {
        var cacheMessages = this.cache;

        var updatedCacheMessages = cacheMessages.map(function (item) {
            if (item.id === itemToCache.id) {
                return itemToCache;
            }
            return item;
        });

        this.setCache(this.cacheName, updatedCacheMessages);
        this.updateMessageDom(updatedCacheMessages);
    };

    this.updateMessageDom = function (mgs) {

        function mapClosure(self) {

            function mapHtmlGen(item) {
                return '<div class="' + self.messageClass + ' alert alert-' + item.cssClass + ' alert-dismissible fade show" data-' + self.dataTarget + '="' + item.id + '" role="alert">\n' + '  <div class="container"> \n' + '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' + '    <span aria-hidden="true">&times;</span>\n' + '  </button>\n' + '  <h4>' + item.title + '</h4> \n' + '  <p>' + item.message + '</p>\n' + '  <a class="btn btn-sm btn-outline-primary" href="' + item.ctaLink + '">' + item.ctaText + '</a>\n' + '  </div>\n' + '</div>';
            }

            return mapHtmlGen;
        }

        var messageEls = mgs.filter(function (item) {
            var now = new Date().getTime();
            return item.active && !item.hidden && Date.parse(item.timeStart) < now && Date.parse(item.timeEnd) > now;
        }).map(mapClosure(this));

        Array.prototype.forEach.call(document.querySelectorAll(this.messageTarget), function (n) {
            return n.parentNode.removeChild(n);
        });

        var targetNode = document.querySelector(this.target);

        if (messageEls.length > 0) {
            var closeHandler = function closeHandler(self) {

                return function (el) {
                    el.querySelector('.container > button.close').addEventListener('click', {
                        handleEvent: function handleEvent(e) {
                            var alert = e.currentTarget.parentElement.parentElement;
                            var id = parseInt(alert.getAttribute('data-' + self.dataTarget));
                            self.messages.map(function (v) {
                                if (v.id === id) {
                                    v.hidden = true;
                                    v.timeCached = new Date().getTime();
                                    self.updateCacheItem(v);
                                    return v;
                                }
                                return v;
                            });
                        }
                    }, false);
                };
            };

            messageEls.forEach(function (el) {
                return targetNode.insertAdjacentHTML('beforeend', el);
            });
            targetNode.classList.remove('hide');

            Array.prototype.forEach.call(targetNode.childNodes, closeHandler(this));
        } else {
            targetNode.classList.add('hide');
        }

        this.cache = this.getCache(this.cacheName);
    };
    document.addEventListener("DOMContentLoaded", this.updateCache(this.messages, this.cache));
}
var messages = [
  {
      id: 1,
      title: 'Announcing the GULD Airdrop!<br><br>',
      message: "Welcome guld users, open source collaborators and new members of the guld blocktree! Please read our current <a href='#'>announcement</a> for recent launches and updates to the guld network.<br><br> Need help with your airdrop claim? - Join our <a href='https://t.me/guldblocktree'>telegram group</a> for support.<br><br>",
      cssClass: "success",
      ctaText: 'Claim Your GULD',
      ctaLink: 'https://t.me/guldblocktree',
      active: true,
      timeStart: 'Aug 7, 2018 19:37:37',
      timeUpdated: 'Aug 7, 2018 19:37:37',
      timeEnd: 'Sep 1, 2018 00:00:00',
      timeCached: null,
      hidden: false
  }/*
,
  {
      id: 2,
      title: "Title for message 2",
      message: "This is a message 2.",
      cssClass: "danger",
      ctaText: "Find Out More",
      ctaLink: "https://www.riomyers.com",
      active: true,
      timeStart: 'Jul 9, 2018 16:09:00',
      timeUpdated: 'Jul 11, 2018 2018 20:27:00',
      timeEnd: 'Aug 28, 2018 19:59:00',
      timeCached: null,
      hidden: false
  }
*/
];

//REMOVE /*...*/ COMMENTS BELOW TO SHOW AIRDROP MESSAGE - !!!Make sure announcement href in message is linked to new Reddit post/announcement page!!!
/*
var banners = new BannerMessages({
  messages: messages,
  target: 'site-messages'
})
*/