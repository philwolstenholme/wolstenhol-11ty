<script>
import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwCardTwitter from './pw-card-twitter.vue';
import PwSection from './pw-section.vue';
import PwCardMastodon from './pw-card-mastodon.vue';
import PwCardBluesky from './pw-card-bluesky.vue';

export default {
  props: {
    toots: {
      type: Array,
    },
    bluesky: {
      type: Array,
    },
  },
  data() {
    return {
      itemsBeforeScrollSaver: 5,
      itemsToShow: 14,
    };
  },
  computed: {
    postsToShow() {
      // Combine this.tweets and this.mastodon and sort by created_at
      const posts = [...this.bluesky, ...this.toots].sort((a, b) => {
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
    PwCardBluesky,
  },
};
</script>

<template>
  <pw-section
    section-key="posts"
    x-ignore
    ax-load="idle"
    x-data="PwTweets"
    x-init="colcade()"
    x-intersect.margin.200px.once="twitterIntents()"
    x-on:resize.window.debounce="colcade()"
  >
    <pw-section-heading title="'Posts' (RIP Twitter)" icon="twitter" section="tweets" />
    <pw-lede class="links-underline mt-3">Bluesky and sometimes Mastodon posts by me</pw-lede>
    <div role="list" x-ref="container" class="tweets-grid mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <div role="listitem" class="tweets-grid__item" v-for="(post, index) in postsToShow.slice(0, itemsBeforeScrollSaver)" :key="index">
        <pw-card-mastodon v-if="post.pw.source === 'mastodon'" :toot="post" />
        <pw-card-bluesky v-if="post.pw.source === 'bluesky'" :post="post" />
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
        <pw-card-mastodon v-if="post.pw.source === 'mastodon'" :toot="post" />
        <pw-card-bluesky v-if="post.pw.source === 'bluesky'" :post="post" />
      </div>
      <div class="tweets-grid__col space-y-5"></div>
      <div class="tweets-grid__col hidden space-y-5 md:block"></div>
      <div class="tweets-grid__col hidden space-y-5 xl:block"></div>
    </div>
  </pw-section>
</template>
