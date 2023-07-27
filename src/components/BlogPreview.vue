<template>
    <div>
        <v-container class="blogPostContainer">
            <v-row>
                <v-col
                    v-for="post in posts"
                    :key="post.id"
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                >
                    <v-card
                        class="card"
                        shaped
                        elevation="5"
                        color="#2c3440"
                        dark
                    >
                        <v-img
                            :src="post.src"
                            aspect-ratio="2"
                            class="postImg"
                        ></v-img>
                        <div class="contentContainer">
                            <h3>{{ post.title }}</h3>
                            <p class="subHeading">{{ post.content }}</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "BlogPreview",
        data() {
            return {
                posts: [
                    {
                        id: "1",
                        src: "https://i0.wp.com/www.comicsbeat.com/wp-content/uploads/2021/03/the-burning-1981-3.jpeg?fit=1313%2C738&ssl=1",
                        title: "10 Camp Slashers to start your summer off right.",
                        content:
                            "As the summer sun shines brightly, and the scent of the great outdoors beckons, horror enthusiasts seek chilling thrills in the most unexpected places. Enter the world of Summer Camp horror slasher movies, a subgenre that combines the idyllic setting of a serene campsite with the heart-pounding terror of a relentless, masked killer. From the mesmerizing beauty of nature to the blood-curdling screams echoing through the woods, these films have carved a niche of their own in the horror genre.",
                        link: "",
                    },
                    {
                        id: "2",
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230419173656-01-evil-dead-rise.jpg?c=16x9",
                        title: "Most Anticipated Horror Releases of the Year",
                        content:
                            "Horror movie enthusiasts, get ready for a frightful journey into the unknown as we explore the most anticipated horror films of 2023. From psychological mind-benders to supernatural spectacles, this year promises...",
                        link: "",
                    },
                    {
                        id: "3",
                        src: "https://www.syfy.com/sites/syfy/files/styles/scale_1280/public/2022/08/screen_shot_2022-08-19_at_10.36.15_am.png",
                        title: "Cloudpunch Recommends: Killer Clowns \u{1F921}",
                        content:
                            "In the world of horror movies, evil can come in many forms, but none are quite as chilling and bizarre as the Killer Clowns. These grinning jesters, adorned in vibrant costumes and wielding twisted humor, have carved their place in the horror genre, leaving audiences both terrified and fascinated. From the dark corners of circuses to the eerie circus tents, we delve into the captivating realm of Killer Clowns in horror movies. Join us as we explore the origins, evolution, and spine-tingling impact of these diabolical entertainers on the silver screen.",
                        link: "",
                    },
                    {
                        id: "4",
                        src: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F06%2F29%2Fpatrick-wilson-insidious-the-red-door-062923-3.jpg",
                        title: "'Insidious: The Red Door' Patrick Wilson on Shifting the Original Storyline",
                        content:
                            "With a legacy of spine-tingling horror, the Insidious franchise has been a cornerstone of the supernatural genre since its debut in 2010. In 2023, horror enthusiasts will once again be plunged into the chilling world of the astral plane and malevolent entities with the highly anticipated release of Insidious: The Red Door. We talk to Patrick Wilson and explore the eerie depths of the latest installment, delving into the spine-chilling premise, the returning cast, and the dark secrets hidden behind the ominous red door.",
                        link: "",
                    },
                    {
                        id: "5",
                        src: "https://m.media-amazon.com/images/M/MV5BMTU4NTY0MzUyMF5BMl5BanBnXkFtZTgwMDA2NDU2NjM@._V1_.jpg",
                        title: "Classic King: Counting Down the Best Adaptations",
                        content:
                            "The Shining has had a profound impact on the horror genre, inspiring countless filmmakers and storytellers. Its influence can be seen in contemporary horror films, TV shows, and pop culture references. The movie's enigmatic ending has sparked numerous theories and debates among fans and critics alike, further solidifying its place as a cinematic enigma. Kubrick's directorial choices in The Shining are nothing short of brilliant. His use of long, tracking shots and slow zooms creates an unsettling sense of voyeurism, making audiences feel like they are witnessing something they shouldn't...",
                        link: "",
                    },
                    {
                        id: "6",
                        src: "https://static.onecms.io/wp-content/uploads/sites/6/2018/10/htra147_vv262-2000.jpg",
                        title: "Halloween Movies Ranked",
                        content:
                            "For over four decades, the Halloween franchise has held horror enthusiasts in its bone-chilling grip. With its iconic masked killer, Michael Myers, and a legacy spanning multiple timelines and reboots, the Halloween series has left an indelible mark on the horror genre. In this post, we take a thrilling journey through the eerie streets of Haddonfield and rank the Halloween movies, from the classics that birthed the slasher subgenre to the modern reinventions that continue to terrify audiences.",
                        link: "",
                    },
                ],
            };
        },
    };
</script>

<style scoped>
    @media only screen and (min-width: 1px) {
        /* Breakpoint for Mobile */
        h3 {
            font-size: 1.2rem;
            margin-bottom: 5px;
            color: whitesmoke;
        }
        .subHeading {
            color: #99aabb;
        }
        .contentContainer {
            flex: 1;
            padding: 5px;
        }
    }

    @media only screen and (min-width: 600px) {
        /* Breakpoint for Tablet */
        h3 {
            font-size: 1.3rem;
        }
    }

    @media only screen and (min-width: 800px) {
        /* Breakpoint for Desktop */
        h3 {
            font-size: 1.5rem;
        }
    }

    @media only screen and (min-width: 1260px) {
        /* Breakpoint for Desktop */
    }

    /* Add a margin between cards */
    .v-card {
        margin-bottom: 20px;
    }

    /* Ensure v-card takes up available vertical space */
    .card {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
