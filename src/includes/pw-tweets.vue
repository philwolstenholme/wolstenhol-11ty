<script>
import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSection from './pw-section.vue';
import PwCardMastodon from './pw-card-mastodon.vue';

export default {
  props: {
    tweets: {
      type: Array,
    },
    toots: {
      type: Array,
    },
    webfinger: {
      type: Object,
    },
  },
  data() {
    return {
      itemsBeforeScrollSaver: 5,
      itemsToShow: 9,
    };
  },
  computed: {
    postsToShow() {
      const posts = [...this.toots].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      return posts.slice(0, this.itemsToShow);
    },
  },
  components: {
    PwLede,
    PwSectionHeading,
    PwSection,
    PwCardMastodon,
  },
};
</script>

<template>
  <pw-section
    section-key="tweets"
    x-ignore
    ax-load="idle"
    x-data="PwTweets"
    x-init="colcade()"
    x-intersect.margin.200px.once="twitterIntents()"
    x-on:resize.window.debounce="colcade()"
  >
    <pw-section-heading title="Tweets and toots*" icon="twitter" section="tweets" />
    <pw-lede class="links-underline mt-3">
      Tweets and toots by me,
      <a href="https://twitter.com/intent/user?user_id=38276082">@philw_</a> and/or
      <a rel="me" :href="webfinger.aliases[0]">{{ webfinger.subject.replace('acct:', '') }}</a
      >.</pw-lede
    >
    <div role="list" x-ref="container" class="tweets-grid mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <div role="listitem" class="tweets-grid__item" v-for="(post, index) in postsToShow.slice(0, itemsBeforeScrollSaver)" :key="index">
        <pw-card-mastodon v-if="post.pw.source === 'mastodon'" :toot="post" />
      </div>
      <div role="listitem" class="scroll-saver block space-y-3 no-js:hidden md:hidden" hidden x-data>
        <p class="m-auto max-w-md text-center font-serif">
          There are <span class="font-bold">{{ postsToShow.length - itemsBeforeScrollSaver }}</span> more of these (!) I thought I'd save
          you some scrolling, but if you want you can…
        </p>
        <button
          type="button"
          class="m-auto block rounded border border-blue-100 bg-black px-4 py-2 font-serif font-bold text-white shadow-hard"
          x-on:click="$event.target.parentElement.remove()"
        >
          Read more tweets
        </button>
      </div>
      <div role="listitem" v-for="(post, index) in postsToShow.slice(itemsBeforeScrollSaver)" :key="index" class="tweets-grid__item">
        <pw-card-twitter :tweet="post" v-if="post.pw.source === 'twitter'" />
        <pw-card-mastodon v-if="post.pw.source === 'mastodon'" :toot="post" />
      </div>
      <div class="tweets-grid__col space-y-5"></div>
      <div class="tweets-grid__col hidden space-y-5 md:block"></div>
      <div class="tweets-grid__col hidden space-y-5 xl:block"></div>
    </div>
  </pw-section>
</template>
