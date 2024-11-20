package com.investify.backend.mappers;

import com.investify.backend.dtos.BadgeDto;
import com.investify.backend.dtos.RankBadgeDto;
import com.investify.backend.entities.Badge;
import com.investify.backend.entities.RankBadge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BadgeMapper {

    @Autowired
    private GameMapper gameMapper;

    public BadgeDto toBadgeDto(Badge badge) {
        if (badge instanceof RankBadge rankBadge) {
            RankBadgeDto rankBadgeDto = new RankBadgeDto();
            mapCommonFields(rankBadge, rankBadgeDto);
            rankBadgeDto.setRank(rankBadge.getRank());
            return rankBadgeDto;
        }

        BadgeDto badgeDto = new BadgeDto();
        mapCommonFields(badge, badgeDto);
        return badgeDto;
    }

    private void mapCommonFields(Badge badge, BadgeDto badgeDto) {
        badgeDto.setId(badge.getId());
        badgeDto.setType(badge.getType());
        badgeDto.setGame(gameMapper.toGameDto(badge.getGame()));
    }
}
