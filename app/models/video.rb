# == Schema Information
#
# Table name: videos
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Video < ApplicationRecord
    validates :title, presence: true, uniqueness: true
    validates :views, presence: true
    validates :author_id, presence: true

    has_one_attached :video
    has_one_attached :thumbnail

    belongs_to :user,
        foreign_key: :author_id,
        class_name: :User

    # has_many :comments,
    #     foreign_key: :video_id,
    #     class_name: :Comment

    # has_many :likes,
    #     foreign_key: :video_id,
    #     class_name: :Like
end
