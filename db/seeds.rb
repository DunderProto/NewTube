require "open-uri"
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Video.destroy_all
User.destroy_all

demo = User.create!(username:"demo", email:"demo@gmail.com", password:"password")
v1 = Video.create!(title: "my 4 brain cells trying to debug", author_id: 1)
v2 = Video.create!(title: "dylan look", author_id: 1)
v3 = Video.create!(title: "ta after they tell you to look at the docs", author_id: 2)
v4 = Video.create!(title: "learning redux", author_id: 2)
v5 = Video.create!(title: "when u only get to phase 2 after 6:00", author_id: 2)
v6 = Video.create!(title: ":)", author_id: 3)
v7 = Video.create!(title: "ouch", author_id: 3)
# v.video.attach(io: File.open("/mnt/c/Users/Isaac\ Nam/Desktop/newtubevids/omardance.mp4"), filename: "omardance.mp4")
v1.video.attach(io: open("https://newtube-dev.s3.amazonaws.com/tmntpractice.mp4"), filename: "tmntpractice.mp4")
v2.video.attach(io: open("https://newtube-dev.s3.amazonaws.com/dantecrazyfrog.mp4"), filename: "dantecrazyfrog.mp4")
v3.video.attach(io: open("https://newtube-dev.s3.amazonaws.com/rengarlaugh.mp4"), filename: "rengarlaugh.mp4")
v4.video.attach(io: open("https://newtube-dev.s3.amazonaws.com/michaelscottKillmyself.mp4"), filename: "michaelscottKillmyself.mp4")
v5.video.attach(io: open("https://newtube-dev.s3.amazonaws.com/whatsWrongWithYou.mp4"), filename: "whatsWrongWithYou.mp4")
v6.video.attach(io: open("https://newtube-dev.s3.amazonaws.com/gachiclap.mp4"), filename: "gachiclap.mp4")
v7.video.attach(io: open("https://newtube-dev.s3.amazonaws.com/whatsgoingon_.mp4"), filename: "whatsgoingon.mp4")





