# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# demo = User.create!(username:"demo", email:"demo@gmail.com", password:"password")
v = Video.create!(title: "look at omar", author_id: 1)
v.video.attach(io: File.open("/mnt/c/Users/Isaac\ Nam/Desktop/newtubevids/omardance.mp4"), filename: "omardance.mp4")